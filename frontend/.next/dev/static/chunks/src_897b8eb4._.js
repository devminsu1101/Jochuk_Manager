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
        activeQuarterId: 1,
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
        setActiveQuarterId: (id)=>set({
                activeQuarterId: id
            }),
        setPlayers: (players)=>set({
                players
            }),
        updateLineup: (quarterId, position, playerId)=>set((state)=>({
                    lineups: state.lineups.map((lineup)=>{
                        if (lineup.quarterId !== quarterId) return lineup;
                        const newAssignedPlayers = {
                            ...lineup.assignedPlayers
                        };
                        if (playerId) {
                            Object.keys(newAssignedPlayers).forEach((pos)=>{
                                if (newAssignedPlayers[pos] === playerId) {
                                    newAssignedPlayers[pos] = null;
                                }
                            });
                        }
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
  "miniPitch": "SoccerPitch-module__z10E1q__miniPitch",
  "node": "SoccerPitch-module__z10E1q__node",
  "nodeCircle": "SoccerPitch-module__z10E1q__nodeCircle",
  "nodeCircleEmpty": "SoccerPitch-module__z10E1q__nodeCircleEmpty",
  "nodeCircleMini": "SoccerPitch-module__z10E1q__nodeCircleMini",
  "nodeLabel": "SoccerPitch-module__z10E1q__nodeLabel",
  "nodeLabelMini": "SoccerPitch-module__z10E1q__nodeLabelMini",
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
"[project]/src/components/DraggablePlayerNode.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DraggablePlayerNode",
    ()=>DraggablePlayerNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/SoccerPitch.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const DraggablePlayerNode = ({ playerId, name, quarterId, positionKey, avatarUrl, isMini = false })=>{
    _s();
    const { attributes, listeners, setNodeRef, transform, isDragging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDraggable"])({
        id: `node-player-${quarterId}-${positionKey}`,
        data: {
            playerId,
            fromQuarterId: quarterId,
            fromPositionKey: positionKey
        },
        disabled: isMini // 미니 뷰에서는 드래그 비활성화
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
        zIndex: 999
    } : undefined;
    const nodeClass = isMini ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].nodeCircleMini : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].nodeCircle;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: setNodeRef,
        style: style,
        ...isMini ? {} : listeners,
        ...isMini ? {} : attributes,
        className: nodeClass,
        children: avatarUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: avatarUrl,
            alt: name,
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].nodeAvatar
        }, void 0, false, {
            fileName: "[project]/src/components/DraggablePlayerNode.tsx",
            lineNumber: 42,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            style: {
                fontSize: isMini ? '0.5rem' : '0.8rem'
            },
            children: name.substring(0, 2)
        }, void 0, false, {
            fileName: "[project]/src/components/DraggablePlayerNode.tsx",
            lineNumber: 44,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/DraggablePlayerNode.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(DraggablePlayerNode, "uZNJ3/8UzXAvFYh/tqZxqBQOH0I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDraggable"]
    ];
});
_c = DraggablePlayerNode;
var _c;
__turbopack_context__.k.register(_c, "DraggablePlayerNode");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DraggablePlayerNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/DraggablePlayerNode.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/SoccerPitch.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const SoccerPitch = ({ quarterId, isMini = false })=>{
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
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pitch} ${isMini ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].miniPitch : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pitchLines,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].centerCircle
                    }, void 0, false, {
                        fileName: "[project]/src/components/SoccerPitch.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].penaltyAreaTop
                    }, void 0, false, {
                        fileName: "[project]/src/components/SoccerPitch.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].penaltyAreaBottom
                    }, void 0, false, {
                        fileName: "[project]/src/components/SoccerPitch.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].halfwayLine
                    }, void 0, false, {
                        fileName: "[project]/src/components/SoccerPitch.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SoccerPitch.tsx",
                lineNumber: 27,
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
                        player ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DraggablePlayerNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DraggablePlayerNode"], {
                            playerId: player.id,
                            name: player.name,
                            quarterId: quarterId,
                            positionKey: posKey,
                            avatarUrl: player.avatarUrl,
                            isMini: isMini
                        }, void 0, false, {
                            fileName: "[project]/src/components/SoccerPitch.tsx",
                            lineNumber: 46,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].nodeCircleEmpty
                        }, void 0, false, {
                            fileName: "[project]/src/components/SoccerPitch.tsx",
                            lineNumber: 55,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        !isMini && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].nodeLabel,
                            children: player ? player.name : posKey
                        }, void 0, false, {
                            fileName: "[project]/src/components/SoccerPitch.tsx",
                            lineNumber: 57,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        isMini && player && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].nodeLabelMini,
                            children: player.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/SoccerPitch.tsx",
                            lineNumber: 58,
                            columnNumber: 34
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, posKey, true, {
                    fileName: "[project]/src/components/SoccerPitch.tsx",
                    lineNumber: 39,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SoccerPitch.tsx",
        lineNumber: 26,
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
  "avatar": "ParticipationSidebar-module__8ZyBCG__avatar",
  "avatarPlaceholder": "ParticipationSidebar-module__8ZyBCG__avatarPlaceholder",
  "avatarWrapper": "ParticipationSidebar-module__8ZyBCG__avatarWrapper",
  "playStats": "ParticipationSidebar-module__8ZyBCG__playStats",
  "playerInfo": "ParticipationSidebar-module__8ZyBCG__playerInfo",
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
const DraggablePlayer = ({ id, name, position, playCount, avatarUrl })=>{
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
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].avatarWrapper,
                children: avatarUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: avatarUrl,
                    alt: name,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].avatar
                }, void 0, false, {
                    fileName: "[project]/src/components/DraggablePlayer.tsx",
                    lineNumber: 37,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].avatarPlaceholder
                }, void 0, false, {
                    fileName: "[project]/src/components/DraggablePlayer.tsx",
                    lineNumber: 39,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/DraggablePlayer.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].playerInfo,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].playerName,
                        children: name
                    }, void 0, false, {
                        fileName: "[project]/src/components/DraggablePlayer.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].playerPosition,
                        children: position
                    }, void 0, false, {
                        fileName: "[project]/src/components/DraggablePlayer.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DraggablePlayer.tsx",
                lineNumber: 42,
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
                lineNumber: 46,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/DraggablePlayer.tsx",
        lineNumber: 28,
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
                lineNumber: 24,
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
                        playCount: count,
                        avatarUrl: player.avatarUrl
                    }, player.id, false, {
                        fileName: "[project]/src/components/ParticipationSidebar.tsx",
                        lineNumber: 29,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/src/components/ParticipationSidebar.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ParticipationSidebar.tsx",
        lineNumber: 23,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html$2d$to$2d$image$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/html-to-image/es/index.js [app-client] (ecmascript)");
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
;
function Home() {
    _s();
    const { setPlayers, updateLineup, lineups, players, activeQuarterId, setActiveQuarterId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMatchStore"])();
    const [showShareOptions, setShowShareOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const captureRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fullViewRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sensors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointerSensor"], {
        activationConstraint: {
            distance: 8
        }
    }));
    const fetchPlayers = async ()=>{
        try {
            const response = await fetch('http://localhost:8000/api/matches/match-123/players');
            if (!response.ok) throw new Error('선수 목록 가져오기 실패');
            const data = await response.json();
            setPlayers(data);
        } catch (error) {
            console.error(error);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            fetchPlayers();
            const interval = setInterval(fetchPlayers, 5000);
            return ({
                "Home.useEffect": ()=>clearInterval(interval)
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        setPlayers
    ]);
    const handleDragEnd = (event)=>{
        const { active, over } = event;
        if (!over || activeQuarterId === 0) return;
        const activeData = active.data.current;
        const overData = over.data.current;
        if (!activeData || !overData) return;
        const playerId = activeData.playerId;
        const { quarterId: targetQuarterId, positionKey: targetPositionKey } = overData;
        if (activeData.fromPositionKey) {
            const fromQuarterId = activeData.fromQuarterId;
            const fromPositionKey = activeData.fromPositionKey;
            if (fromQuarterId === targetQuarterId) {
                const targetLineup = lineups.find((l)=>l.quarterId === targetQuarterId);
                const playerAtTarget = targetLineup?.assignedPlayers[targetPositionKey];
                updateLineup(targetQuarterId, targetPositionKey, playerId);
                if (playerAtTarget) {
                    updateLineup(fromQuarterId, fromPositionKey, playerAtTarget);
                } else {
                    updateLineup(fromQuarterId, fromPositionKey, null);
                }
            }
        } else {
            updateLineup(targetQuarterId, targetPositionKey, playerId);
        }
    };
    const handleAutoAssign = async ()=>{
        const currentPlayers = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMatchStore"].getState().players;
        if (currentPlayers.length < 11) {
            alert(`최소 11명의 선수가 필요합니다. (현재: ${currentPlayers.length}명)`);
            return;
        }
        try {
            const response = await fetch('http://localhost:8000/api/auto-assign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    players: currentPlayers,
                    quarters: lineups.map((l)=>({
                            quarterId: l.quarterId,
                            formation: l.formation
                        }))
                })
            });
            if (!response.ok) throw new Error('API 호출 실패');
            const data = await response.json();
            data.forEach((item)=>{
                Object.entries(item.assignedPlayers).forEach(([pos, pid])=>{
                    updateLineup(item.quarterId, pos, pid);
                });
            });
            alert('AI 자동 배정이 완료되었습니다!');
        } catch (error) {
            alert('자동 배정 중 오류가 발생했습니다.');
        }
    };
    const handleSaveImage = async ()=>{
        const target = activeQuarterId === 0 ? fullViewRef.current : captureRef.current;
        if (target === null) return;
        try {
            const dataUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html$2d$to$2d$image$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toPng"])(target, {
                cacheBust: true,
                backgroundColor: activeQuarterId === 0 ? '#eee' : '#f0f2f5'
            });
            const link = document.createElement('a');
            const filename = activeQuarterId === 0 ? 'full-lineup' : `q${activeQuarterId}-lineup`;
            link.download = `${filename}-${new Date().getTime()}.png`;
            link.href = dataUrl;
            link.click();
            setShowShareOptions(false);
        } catch (err) {
            alert('이미지 저장 중 오류가 발생했습니다.');
        }
    };
    const handleCopyInviteLink = ()=>{
        const inviteLink = `${window.location.origin}/register/match-123`;
        navigator.clipboard.writeText(inviteLink);
        alert('초대 링크가 클립보드에 복사되었습니다!');
        setShowShareOptions(false);
    };
    const getSubsForQuarter = (quarterId)=>{
        const lineup = lineups.find((l)=>l.quarterId === quarterId);
        if (!lineup) return [];
        const assignedIds = Object.values(lineup.assignedPlayers);
        return players.filter((p)=>!assignedIds.includes(p.id));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DndContext"], {
        sensors: sensors,
        onDragEnd: handleDragEnd,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "main-layout",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "workspace",
                    children: [
                        activeQuarterId === 0 ? /* [전체 보기 모드] */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "full-view-container",
                            ref: fullViewRef,
                            children: [
                                1,
                                2,
                                3,
                                4
                            ].map((q)=>{
                                const subs = getSubsForQuarter(q);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mini-pitch-card",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mini-pitch-box",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "pitch-title",
                                                    children: [
                                                        q,
                                                        "쿼터"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SoccerPitch"], {
                                                    quarterId: q,
                                                    isMini: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 148,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mini-subs-box",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                    style: {
                                                        color: '#d32f2f'
                                                    },
                                                    children: "대기:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 153,
                                                    columnNumber: 23
                                                }, this),
                                                " ",
                                                subs.map((p)=>p.name).join(', ') || '없음'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 152,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, q, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 147,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 143,
                            columnNumber: 13
                        }, this) : /* [개별 편집 모드] */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "editor-main-view",
                            ref: captureRef,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pitch-wrapper",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "pitch-title",
                                            children: [
                                                activeQuarterId,
                                                "쿼터 라인업"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 163,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SoccerPitch"], {
                                            quarterId: activeQuarterId
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 164,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 162,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "subs-sidebar",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                margin: 0,
                                                fontSize: '0.9rem',
                                                color: '#d32f2f'
                                            },
                                            children: [
                                                "이번 쿼터 대기 (",
                                                getSubsForQuarter(activeQuarterId).length,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 168,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                overflowY: 'auto',
                                                marginTop: '10px'
                                            },
                                            children: getSubsForQuarter(activeQuarterId).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mini-player-badge",
                                                    children: [
                                                        p.avatarUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: p.avatarUrl,
                                                            alt: "",
                                                            className: "mini-avatar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 172,
                                                            columnNumber: 39
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: p.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/page.tsx",
                                                            lineNumber: 173,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, p.id, true, {
                                                    fileName: "[project]/src/app/page.tsx",
                                                    lineNumber: 171,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 169,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 167,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 161,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "quarter-tabs-bottom",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `tab-button ${activeQuarterId === 0 ? 'full-view' : ''}`,
                                    onClick: ()=>setActiveQuarterId(0),
                                    children: "📊 전체 보기"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 183,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: '1px',
                                        height: '24px',
                                        background: '#ddd',
                                        margin: '0 10px'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 189,
                                    columnNumber: 13
                                }, this),
                                [
                                    1,
                                    2,
                                    3,
                                    4
                                ].map((q)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `tab-button ${activeQuarterId === q ? 'active' : ''}`,
                                        onClick: ()=>setActiveQuarterId(q),
                                        children: [
                                            q,
                                            "쿼터"
                                        ]
                                    }, q, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 191,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 182,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 139,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                    className: "sidebar",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ParticipationSidebar"], {}, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 203,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "actions",
                            style: {
                                marginTop: 'auto',
                                paddingTop: '20px',
                                position: 'relative'
                            },
                            children: [
                                showShareOptions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: 'absolute',
                                        bottom: '130px',
                                        left: 0,
                                        right: 0,
                                        background: 'white',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        padding: '10px',
                                        boxShadow: '0 -4px 10px rgba(0,0,0,0.1)',
                                        zIndex: 100
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleSaveImage,
                                            style: shareItemStyle,
                                            children: activeQuarterId === 0 ? '전체 라인업 저장' : '현재 쿼터 저장'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 211,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleCopyInviteLink,
                                            style: shareItemStyle,
                                            children: "플레이어 초대 링크 복사"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 214,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 206,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowShareOptions(!showShareOptions),
                                    style: {
                                        ...actionButtonStyle,
                                        background: '#1976d2',
                                        marginBottom: '10px'
                                    },
                                    children: "공유 및 관리"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 218,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleAutoAssign,
                                    style: actionButtonStyle,
                                    children: "AI 자동 배정"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 223,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 204,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 202,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 138,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, this);
}
_s(Home, "xFjSGg0vjszRd4K1sztIpgGnj2g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMatchStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"]
    ];
});
_c = Home;
const actionButtonStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    cursor: 'pointer',
    background: '#2e7d32',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold'
};
const shareItemStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    borderBottom: '1px solid #eee',
    textAlign: 'left',
    display: 'block'
};
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_897b8eb4._.js.map