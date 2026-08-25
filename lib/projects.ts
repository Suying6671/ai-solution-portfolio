export function nextExpandedProjectId(
  currentId: string | null,
  requestedId: string,
) {
  return currentId === requestedId ? null : requestedId;
}
