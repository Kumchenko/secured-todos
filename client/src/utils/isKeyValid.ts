const _alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export const isKeyValid = (providedKey?: string | null, originalKey = process.env.NEXT_PUBLIC_KEY) => {
    if (!providedKey) return false
    for (let i = 0; i < _alphabet.length; i++) {
        const decrypted = providedKey
            .toUpperCase()
            .split('')
            .map(letter => {
                return _alphabet.at(_alphabet.indexOf(letter) - i)
            })
            .join('')

        if (decrypted === originalKey) {
            return true
        }
    }
    return false
}
