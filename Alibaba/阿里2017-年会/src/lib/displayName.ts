export default function displayName(username: string, nickname: string) {
    if (!username || !nickname) return username || nickname || ''

    return `${nickname}（${username}）`
}
