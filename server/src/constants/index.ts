export const isDev = (process.env.NODE_ENV || 'production') === 'development'
export const latinPattern = /[a-zA-Z]/
export const cyrillicPattern = /[\u0400-\u04FF]/
export const numPattern = /\d/
export const mathOpsPattern = /[\+\*\^\-%/:=]/
