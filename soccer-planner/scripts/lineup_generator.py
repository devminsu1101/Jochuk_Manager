import json

def parse_formation(f_str):
    # Standard formats: 4-2-3-1, 4-4-2, 3-4-3
    parts = list(map(int, f_str.split('-')))
    if len(parts) == 4: # 4-2-3-1
        return {"GK": 1, "DF": parts[0], "CDM": parts[1], "AM": parts[2], "FW": parts[3]}
    elif len(parts) == 3: # 4-4-2, 3-4-3
        return {"GK": 1, "DF": parts[0], "MF": parts[1], "FW": parts[2]}
    return {}

def generate_lineup(players_data, formations_per_quarter):
    players = []
    for line in players_data.strip().split('\n'):
        if not line.strip() or 'Q' in line: continue # Skip empty or formation lines
        parts = line.strip().split(' ')
        name = parts[0]
        prefs = [p.strip(',') for p in parts[1:]]
        players.append({"name": name, "prefs": prefs, "play_count": 0})

    gk_players = [p for p in players if p['prefs'] and p['prefs'][0] == "GK"]
    
    lineups = []
    for q_idx, f_str in enumerate(formations_per_quarter):
        slots_config = parse_formation(f_str)
        current_quarter = {pos: [] for pos in slots_config}
        assigned_names = []

        # 1. GK Assignment (Priority 1: GK Pref players play all 4Q)
        # In 13 players list, sungmin is the only 1st pref GK
        selected_gk = gk_players[0] if gk_players else players[0]
        current_quarter["GK"].append(selected_gk['name'])
        selected_gk['play_count'] += 1
        assigned_names.append(selected_gk['name'])

        # 2. Fill the rest of the slots
        # We need to fill 10 more slots
        all_slots = []
        for cat, count in slots_config.items():
            if cat == "GK": continue
            for _ in range(count):
                all_slots.append(cat)

        for cat in all_slots:
            # Sorting logic:
            # 1. Least played overall
            # 2. 1st preference match (Priority 1)
            # 3. Any preference match
            available = [p for p in players if p['name'] not in assigned_names]
            
            def sort_key(p):
                # 1. Least played (Fairness)
                play_score = p['play_count']
                
                # 2. 1st preference match
                pref_score = 0
                if p['prefs'] and p['prefs'][0][:2] in cat: # Simple check: CDM/CAM starts with 'C', matches 'CDM'/'AM'
                     pref_score = -2
                elif any(pr[:2] in cat for pr in p['prefs']):
                     pref_score = -1
                
                return (play_score, pref_score)

            available.sort(key=sort_key)
            selected = available[0]
            current_quarter[cat].append(selected['name'])
            selected['play_count'] += 1
            assigned_names.append(selected['name'])

        lineups.append({"quarter": q_idx+1, "formation": f_str, "team": current_quarter})

    return lineups, players

if __name__ == "__main__":
    with open("soccer-planner/assets/example_player.txt", "r") as f:
        lines = f.readlines()
    
    players_raw = "".join([l for l in lines if 'Q' not in l])
    formations = [l.split(' ')[1].strip() for l in lines if 'Q' in l] # Extract 4-2-3-1 etc
    
    lineups, stats = generate_lineup(players_raw, formations)
    
    for l in lineups:
        print(f"--- {l['quarter']}Q ({l['formation']}) ---")
        for pos, names in l['team'].items():
            print(f"{pos}: {names}")
        print()

    print("--- Participation Stats (Fairness Check) ---")
    for p in sorted(stats, key=lambda x: x['play_count']):
        print(f"{p['name']}: {p['play_count']} / 4 quarters")
