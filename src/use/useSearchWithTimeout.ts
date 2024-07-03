export function useSearchWithTimeout(listAllFunction: () => Promise<void> | void) {
  let timeout: ReturnType<typeof setTimeout>;
  const searchItem = (): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      listAllFunction();
      clearTimeout(timeout);
    }, 1000);
  };
  return { searchItem };
}
