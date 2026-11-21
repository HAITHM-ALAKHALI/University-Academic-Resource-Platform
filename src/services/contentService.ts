/**
 * Backward-Compatibility Shim for contentService.
 * Canonical content management implementation has been unified into courseContentsService.
 * Re-exports courseContentsService under both named and default exports to prevent breaking callers.
 */
import { courseContentsService } from "./courseContentsService";

export { courseContentsService, courseContentsService as contentService };
export default courseContentsService;
