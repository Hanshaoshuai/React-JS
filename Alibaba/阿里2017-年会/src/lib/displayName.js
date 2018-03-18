"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function displayName(username, nickname) {
    if (!username || !nickname)
        return username || nickname || '';
    return `${nickname}（${username}）`;
}
exports.default = displayName;
//# sourceMappingURL=displayName.js.map