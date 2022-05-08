/// <reference types="vite/client" />

declare module 'array-unflat' {
  export default function<T>(array: T[], size?: number): T[][]
}