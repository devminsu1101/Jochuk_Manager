module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/store/useMatchStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMatchStore",
    ()=>useMatchStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
;
const useMatchStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set)=>({
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
}),
"[project]/src/constants/formations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/components/SoccerPitch.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "centerCircle": "SoccerPitch-module__z10E1q__centerCircle",
  "halfwayLine": "SoccerPitch-module__z10E1q__halfwayLine",
  "node": "SoccerPitch-module__z10E1q__node",
  "nodeAvatar": "SoccerPitch-module__z10E1q__nodeAvatar",
  "nodeCircle": "SoccerPitch-module__z10E1q__nodeCircle",
  "nodeCircleEmpty": "SoccerPitch-module__z10E1q__nodeCircleEmpty",
  "nodeLabel": "SoccerPitch-module__z10E1q__nodeLabel",
  "nodeOver": "SoccerPitch-module__z10E1q__nodeOver",
  "penaltyAreaBottom": "SoccerPitch-module__z10E1q__penaltyAreaBottom",
  "penaltyAreaTop": "SoccerPitch-module__z10E1q__penaltyAreaTop",
  "pitch": "SoccerPitch-module__z10E1q__pitch",
  "pitchLines": "SoccerPitch-module__z10E1q__pitchLines",
});
}),
"[project]/src/components/DroppableNode.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DroppableNode",
    ()=>DroppableNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/SoccerPitch.module.css [app-ssr] (css module)");
'use client';
;
;
;
const DroppableNode = ({ quarterId, positionKey, children, style })=>{
    const { isOver, setNodeRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDroppable"])({
        id: `node-${quarterId}-${positionKey}`,
        data: {
            quarterId,
            positionKey
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: setNodeRef,
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].node} ${isOver ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].nodeOver : ''}`,
        style: style,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/DroppableNode.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/DraggablePlayerNode.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DraggablePlayerNode",
    ()=>DraggablePlayerNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/SoccerPitch.module.css [app-ssr] (css module)");
'use client';
;
;
;
const DraggablePlayerNode = ({ playerId, name, quarterId, positionKey, avatarUrl })=>{
    const { attributes, listeners, setNodeRef, transform, isDragging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDraggable"])({
        id: `node-player-${quarterId}-${positionKey}`,
        data: {
            playerId,
            fromQuarterId: quarterId,
            fromPositionKey: positionKey
        }
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
        zIndex: 999
    } : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: setNodeRef,
        style: style,
        ...listeners,
        ...attributes,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].nodeCircle,
        children: avatarUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: avatarUrl,
            alt: name,
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].nodeAvatar
        }, void 0, false, {
            fileName: "[project]/src/components/DraggablePlayerNode.tsx",
            lineNumber: 36,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)) : name.substring(0, 2)
    }, void 0, false, {
        fileName: "[project]/src/components/DraggablePlayerNode.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/SoccerPitch.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SoccerPitch",
    ()=>SoccerPitch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$formations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/formations.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useMatchStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DroppableNode$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/DroppableNode.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DraggablePlayerNode$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/DraggablePlayerNode.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/SoccerPitch.module.css [app-ssr] (css module)");
'use client';
;
;
;
;
;
;
const SoccerPitch = ({ quarterId })=>{
    const lineup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMatchStore"])((state)=>state.lineups.find((l)=>l.quarterId === quarterId));
    const players = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMatchStore"])((state)=>state.players);
    if (!lineup) return null;
    const formationData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$formations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FORMATIONS"][lineup.formation] || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$formations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FORMATIONS"]['4-4-2'];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pitch,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pitchLines,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].centerCircle
                    }, void 0, false, {
                        fileName: "[project]/src/components/SoccerPitch.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].penaltyAreaTop
                    }, void 0, false, {
                        fileName: "[project]/src/components/SoccerPitch.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].penaltyAreaBottom
                    }, void 0, false, {
                        fileName: "[project]/src/components/SoccerPitch.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].halfwayLine
                    }, void 0, false, {
                        fileName: "[project]/src/components/SoccerPitch.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SoccerPitch.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            Object.entries(formationData).map(([posKey, style])=>{
                const assignedPlayerId = lineup.assignedPlayers[posKey];
                const player = players.find((p)=>p.id === assignedPlayerId);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DroppableNode$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DroppableNode"], {
                    quarterId: quarterId,
                    positionKey: posKey,
                    style: {
                        top: style.top,
                        left: style.left
                    },
                    children: [
                        player ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DraggablePlayerNode$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DraggablePlayerNode"], {
                            playerId: player.id,
                            name: player.name,
                            quarterId: quarterId,
                            positionKey: posKey,
                            avatarUrl: player.avatarUrl
                        }, void 0, false, {
                            fileName: "[project]/src/components/SoccerPitch.tsx",
                            lineNumber: 45,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].nodeCircleEmpty
                        }, void 0, false, {
                            fileName: "[project]/src/components/SoccerPitch.tsx",
                            lineNumber: 53,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SoccerPitch$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].nodeLabel,
                            children: player ? player.name : posKey
                        }, void 0, false, {
                            fileName: "[project]/src/components/SoccerPitch.tsx",
                            lineNumber: 55,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, posKey, true, {
                    fileName: "[project]/src/components/SoccerPitch.tsx",
                    lineNumber: 38,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SoccerPitch.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/ParticipationSidebar.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "avatar": "ParticipationSidebar-module__8ZyBCG__avatar",
  "avatarPlaceholder": "ParticipationSidebar-module__8ZyBCG__avatarPlaceholder",
  "avatarWrapper": "ParticipationSidebar-module__8ZyBCG__avatarWrapper",
  "playStats": "ParticipationSidebar-module__8ZyBCG__playStats",
  "playerInfo": "ParticipationSidebar-module__8ZyBCG__playerInfo",
  "playerItem": "ParticipationSidebar-module__8ZyBCG__playerItem",
  "playerList": "ParticipationSidebar-module__8ZyBCG__playerList",
  "sidebarContent": "ParticipationSidebar-module__8ZyBCG__sidebarContent",
});
}),
"[project]/src/components/DraggablePlayer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DraggablePlayer",
    ()=>DraggablePlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@dnd-kit/core/dist/core.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ParticipationSidebar.module.css [app-ssr] (css module)");
'use client';
;
;
;
const DraggablePlayer = ({ id, name, position, playCount, avatarUrl })=>{
    const { attributes, listeners, setNodeRef, transform, isDragging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDraggable"])({
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: setNodeRef,
        style: style,
        ...listeners,
        ...attributes,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].playerItem,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].avatarWrapper,
                children: avatarUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: avatarUrl,
                    alt: name,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].avatar
                }, void 0, false, {
                    fileName: "[project]/src/components/DraggablePlayer.tsx",
                    lineNumber: 37,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].avatarPlaceholder
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].playerInfo,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].playerName,
                        children: name
                    }, void 0, false, {
                        fileName: "[project]/src/components/DraggablePlayer.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].playerPosition,
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].playStats,
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
}),
"[project]/src/components/ParticipationSidebar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ParticipationSidebar",
    ()=>ParticipationSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useMatchStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DraggablePlayer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/DraggablePlayer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ParticipationSidebar.module.css [app-ssr] (css module)");
'use client';
;
;
;
;
const ParticipationSidebar = ()=>{
    const players = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMatchStore"])((state)=>state.players);
    const lineups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useMatchStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMatchStore"])((state)=>state.lineups);
    const getPlayCount = (playerId)=>{
        let count = 0;
        lineups.forEach((lineup)=>{
            if (Object.values(lineup.assignedPlayers).includes(playerId)) {
                count++;
            }
        });
        return count;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sidebarContent,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ParticipationSidebar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].playerList,
                children: players.map((player)=>{
                    const count = getPlayCount(player.id);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$DraggablePlayer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DraggablePlayer"], {
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
}),
"[project]/src/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/src/app/page.tsx'\n\nExpected ',', got ':'");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8a91241b._.js.map