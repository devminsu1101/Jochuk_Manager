(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/store/useMatchStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMatchStore",
    ()=>useMatchStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
const useMatchStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set)=>({
        players: [],
        lineups: [
            1,
            2,
            3,
            4
        ].map((id)=>({
                quarterId: id,
                formation: '4-4-2',
                assignedPlayers: {}
            })),
        setPlayers: (players)=>set({
                players
            }),
        updateLineup: (quarterId, position, playerId)=>set((state)=>({
                    lineups: state.lineups.map((lineup)=>{
                        if (lineup.quarterId !== quarterId) return lineup;
                        const newAssignedPlayers = {
                            ...lineup.assignedPlayers
                        };
                        // 1. 중복 방지: 해당 선수가 이 쿼터의 다른 포지션에 있다면 제거
                        if (playerId) {
                            Object.keys(newAssignedPlayers).forEach((pos)=>{
                                if (newAssignedPlayers[pos] === playerId) {
                                    newAssignedPlayers[pos] = null;
                                }
                            });
                        }
                        // 2. 새로운 포지션에 배정
                        newAssignedPlayers[position] = playerId;
                        return {
                            ...lineup,
                            assignedPlayers: newAssignedPlayers
                        };
                    })
                })),
        setFormation: (quarterId, formation)=>set((state)=>({
                    lineups: state.lineups.map((lineup)=>lineup.quarterId === quarterId ? {
                            ...lineup,
                            formation,
                            assignedPlayers: {}
                        } : lineup)
                }))
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/constants/formations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FORMATIONS",
    ()=>FORMATIONS
]);
const FORMATIONS = {
    '4-4-2': {
        'GK': {
            top: '88%',
            left: '50%'
        },
        'LB': {
            top: '70%',
            left: '15%'
        },
        'LCB': {
            top: '75%',
            left: '38%'
        },
        'RCB': {
            top: '75%',
            left: '62%'
        },
        'RB': {
            top: '70%',
            left: '85%'
        },
        'LM': {
            top: '45%',
            left: '15%'
        },
        'LCM': {
            top: '50%',
            left: '38%'
        },
        'RCM': {
            top: '50%',
            left: '62%'
        },
        'RM': {
            top: '45%',
            left: '85%'
        },
        'LST': {
            top: '20%',
            left: '38%'
        },
        'RST': {
            top: '20%',
            left: '62%'
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SoccerPitch.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "centerCircle": "SoccerPitch-module__z10E1q__centerCircle",
  "halfwayLine": "SoccerPitch-module__z10E1q__halfwayLine",
  "node": "SoccerPitch-module__z10E1q__node",
  "nodeCircle": "SoccerPitch-module__z10E1q__nodeCircle",
  "nodeLabel": "SoccerPitch-module__z10E1q__nodeLabel",
  "nodeOver": "SoccerPitch-module__z10E1q__nodeOver",
  "penaltyAreaBottom": "SoccerPitch-module__z10E1q__penaltyAreaBottom",
  "penaltyAreaTop": "SoccerPitch-module__z10E1q__penaltyAreaTop",
  "pitch": "SoccerPitch-module__z10E1q__pitch",
  "pitchLines": "SoccerPitch-module__z10E1q__pitchLines",
});
}),
"[project]/src/components/DroppableNode.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DroppableNode",
    ()=>DroppableNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/SoccerPitch.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const DroppableNode = ({ quarterId, positionKey, children, style })=>{
    _s();
    const { isOver, setNodeRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDroppable"])({
        id: `node-${quarterId}-${positionKey}`,
        data: {
            quarterId,
            positionKey
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: setNodeRef,
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].node} ${isOver ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].nodeOver : ''}`,
        style: style,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/DroppableNode.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(DroppableNode, "fT702R7NW3L8KUJObOwGrnMsXMQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDroppable"]
    ];
});
_c = DroppableNode;
var _c;
__turbopack_context__.k.register(_c, "DroppableNode");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SoccerPitch.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SoccerPitch",
    ()=>SoccerPitch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$formations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/formations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useMatchStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DroppableNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/DroppableNode.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/SoccerPitch.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const SoccerPitch = ({ quarterId })=>{
    _s();
    const lineup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMatchStore"])({
        "SoccerPitch.useMatchStore[lineup]": (state)=>state.lineups.find({
                "SoccerPitch.useMatchStore[lineup]": (l)=>l.quarterId === quarterId
            }["SoccerPitch.useMatchStore[lineup]"])
    }["SoccerPitch.useMatchStore[lineup]"]);
    const players = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMatchStore"])({
        "SoccerPitch.useMatchStore[players]": (state)=>state.players
    }["SoccerPitch.useMatchStore[players]"]);
    if (!lineup) return null;
    const formationData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$formations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORMATIONS"][lineup.formation] || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$formations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORMATIONS"]['4-4-2'];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pitch,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pitchLines,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].centerCircle
                    }, void 0, false, {
                        fileName: "[project]/src/components/SoccerPitch.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].penaltyAreaTop
                    }, void 0, false, {
                        fileName: "[project]/src/components/SoccerPitch.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].penaltyAreaBottom
                    }, void 0, false, {
                        fileName: "[project]/src/components/SoccerPitch.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].halfwayLine
                    }, void 0, false, {
                        fileName: "[project]/src/components/SoccerPitch.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SoccerPitch.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            Object.entries(formationData).map(([posKey, style])=>{
                const assignedPlayerId = lineup.assignedPlayers[posKey];
                const player = players.find((p)=>p.id === assignedPlayerId);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DroppableNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DroppableNode"], {
                    quarterId: quarterId,
                    positionKey: posKey,
                    style: {
                        top: style.top,
                        left: style.left
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].nodeCircle,
                            children: player ? player.name.substring(0, 2) : ''
                        }, void 0, false, {
                            fileName: "[project]/src/components/SoccerPitch.tsx",
                            lineNumber: 43,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].nodeLabel,
                            children: player ? player.name : posKey
                        }, void 0, false, {
                            fileName: "[project]/src/components/SoccerPitch.tsx",
                            lineNumber: 46,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, posKey, true, {
                    fileName: "[project]/src/components/SoccerPitch.tsx",
                    lineNumber: 37,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SoccerPitch.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SoccerPitch, "jIGmpaN+UXqUV+VhbIJFVw9s4rw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMatchStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMatchStore"]
    ];
});
_c = SoccerPitch;
var _c;
__turbopack_context__.k.register(_c, "SoccerPitch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ParticipationSidebar.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "playStats": "ParticipationSidebar-module__8ZyBCG__playStats",
  "playerItem": "ParticipationSidebar-module__8ZyBCG__playerItem",
  "playerList": "ParticipationSidebar-module__8ZyBCG__playerList",
  "playerName": "ParticipationSidebar-module__8ZyBCG__playerName",
  "playerPosition": "ParticipationSidebar-module__8ZyBCG__playerPosition",
  "sidebarContent": "ParticipationSidebar-module__8ZyBCG__sidebarContent",
});
}),
"[project]/src/components/DraggablePlayer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DraggablePlayer",
    ()=>DraggablePlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ParticipationSidebar.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const DraggablePlayer = ({ id, name, position, playCount })=>{
    _s();
    const { attributes, listeners, setNodeRef, transform, isDragging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDraggable"])({
        id: `player-${id}`,
        data: {
            playerId: id
        }
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
        zIndex: 999
    } : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: setNodeRef,
        style: style,
        ...listeners,
        ...attributes,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].playerItem,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].playerInfo,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].playerName,
                        children: name
                    }, void 0, false, {
                        fileName: "[project]/src/components/DraggablePlayer.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].playerPosition,
                        children: position
                    }, void 0, false, {
                        fileName: "[project]/src/components/DraggablePlayer.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DraggablePlayer.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].playStats,
                children: [
                    playCount,
                    "/4 쿼터"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DraggablePlayer.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/DraggablePlayer.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(DraggablePlayer, "uZNJ3/8UzXAvFYh/tqZxqBQOH0I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDraggable"]
    ];
});
_c = DraggablePlayer;
var _c;
__turbopack_context__.k.register(_c, "DraggablePlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ParticipationSidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ParticipationSidebar",
    ()=>ParticipationSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useMatchStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DraggablePlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/DraggablePlayer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ParticipationSidebar.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const ParticipationSidebar = ()=>{
    _s();
    const players = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMatchStore"])({
        "ParticipationSidebar.useMatchStore[players]": (state)=>state.players
    }["ParticipationSidebar.useMatchStore[players]"]);
    const lineups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMatchStore"])({
        "ParticipationSidebar.useMatchStore[lineups]": (state)=>state.lineups
    }["ParticipationSidebar.useMatchStore[lineups]"]);
    // 선수별 출전 쿼터 계산
    const getPlayCount = (playerId)=>{
        let count = 0;
        lineups.forEach((lineup)=>{
            if (Object.values(lineup.assignedPlayers).includes(playerId)) {
                count++;
            }
        });
        return count;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidebarContent,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                children: [
                    "참여 명단 (",
                    players.length,
                    "명)"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ParticipationSidebar.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].playerList,
                children: players.map((player)=>{
                    const count = getPlayCount(player.id);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DraggablePlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DraggablePlayer"], {
                        id: player.id,
                        name: player.name,
                        position: player.primaryPosition,
                        playCount: count
                    }, player.id, false, {
                        fileName: "[project]/src/components/ParticipationSidebar.tsx",
                        lineNumber: 30,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/src/components/ParticipationSidebar.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ParticipationSidebar.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ParticipationSidebar, "GWfeo58topPAwQP5pMCWxeYdqQI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMatchStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMatchStore"]
    ];
});
_c = ParticipationSidebar;
var _c;
__turbopack_context__.k.register(_c, "ParticipationSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useMatchStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SoccerPitch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ParticipationSidebar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const MOCK_PLAYERS = [
    {
        id: '1',
        name: '김민수',
        primaryPosition: 'ST',
        secondaryPositions: [
            'LW'
        ],
        playCount: 0
    },
    {
        id: '2',
        name: '이철수',
        primaryPosition: 'GK',
        secondaryPositions: [],
        playCount: 0
    },
    {
        id: '3',
        name: '박영희',
        primaryPosition: 'CB',
        secondaryPositions: [
            'RB'
        ],
        playCount: 0
    },
    {
        id: '4',
        name: '최강타',
        primaryPosition: 'CDM',
        secondaryPositions: [
            'CM'
        ],
        playCount: 0
    },
    {
        id: '5',
        name: '손흥민',
        primaryPosition: 'LW',
        secondaryPositions: [
            'ST'
        ],
        playCount: 0
    }
];
function Home() {
    _s();
    const { setPlayers, updateLineup } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMatchStore"])();
    const sensors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointerSensor"], {
        activationConstraint: {
            distance: 8
        }
    }));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            setPlayers(MOCK_PLAYERS);
        }
    }["Home.useEffect"], [
        setPlayers
    ]);
    const handleDragEnd = (event)=>{
        const { active, over } = event;
        if (!over) return;
        // active.id는 'player-1', over.id는 'node-1-GK' 형식
        const playerId = active.data.current?.playerId;
        const { quarterId, positionKey } = over.data.current;
        if (playerId && quarterId && positionKey) {
            updateLineup(quarterId, positionKey, playerId);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DndContext"], {
        sensors: sensors,
        onDragEnd: handleDragEnd,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "main-layout",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "editor-container",
                    children: [
                        1,
                        2,
                        3,
                        4
                    ].map((q)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pitch-card",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "pitch-title",
                                    children: [
                                        q,
                                        "쿼터"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 53,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SoccerPitch"], {
                                    quarterId: q
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, q, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 52,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                    className: "sidebar",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParticipationSidebar"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "actions",
                            style: {
                                marginTop: 'auto',
                                paddingTop: '20px'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                style: {
                                    width: '100%',
                                    padding: '12px',
                                    fontSize: '1.1rem',
                                    cursor: 'pointer',
                                    background: '#2e7d32',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontWeight: 'bold'
                                },
                                children: "AI 자동 배정"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 49,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(Home, "GO1VgbJXadPzINlFpqN1x4RkTqw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMatchStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_f9fcd019._.js.map