export type VerifierPayload = Record<string, unknown>

export const verifyPayload = (
  payload: VerifierPayload,
  keys: string[]
): { error: boolean; message?: string } => {
  const missingKeys = keys.filter((key) => !payload[key])
  if (missingKeys.length) {
    const errorMessage = `Missing required entities: ${missingKeys.join(', ')}`
    return { error: true, message: errorMessage }
  }
  return { error: false }
}
