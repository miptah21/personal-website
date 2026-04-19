import { CollectionAfterChangeHook } from 'payload';
import { revalidatePath } from 'next/cache';

export const revalidatePaths = (
  pathsOrBuilder: string[] | ((doc: any) => string[])
): CollectionAfterChangeHook => {
  return async ({ doc, req: { payload }, operation }) => {
    if (operation === 'create' || operation === 'update') {
      try {
        const paths = typeof pathsOrBuilder === 'function' ? pathsOrBuilder(doc) : pathsOrBuilder;
        for (const path of paths) {
          revalidatePath(path);
          payload.logger.info(`Revalidated path: ${path}`);
        }
      } catch (err) {
        payload.logger.error(`Error revalidating paths: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
    return doc;
  };
};
