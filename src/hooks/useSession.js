/**
 * @deprecated This hook is maintained for backward compatibility.
 * Please use `useSessionContext` from '../contexts/SessionContext.jsx' instead.
 * 
 * This hook is now a simple wrapper around the SessionContext.
 * To migrate:
 * 1. Ensure your component is wrapped in <SessionProvider>
 * 2. Replace: import { useSession } from './hooks/useSession';
 *    With: import { useSessionContext } from './contexts/SessionContext';
 * 3. Replace: const session = useSession();
 *    With: const session = useSessionContext();
 */

import { useSessionContext } from '../contexts/SessionContext';

export const useSession = () => {
  // Simply re-export the context hook to maintain backward compatibility
  return useSessionContext();
};