import { marked } from "marked";
import logger from "../../Config/logger.config";
import sanitizeHtml from "sanitize-html";
import TurndownService from "turndown";

export async function sanitize(markdown:string):Promise<string>{
    if(!markdown || typeof markdown !== "string") return "";
    try {
        const convertedHtml = await marked.parse(markdown);
        const sanitizedHtml = sanitizeHtml(convertedHtml,{
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img","pre","code"]),
            allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                "img":["src","alt","title"],
                "code":["class"],
                "pre":["href","target"],
                "a": ["href","target"]
            },
            allowedSchemes: ["http","https"],
            allowedSchemesByTag:{
                "img":["http","https"]
            }
        });

        const tds = new TurndownService();
        return tds.turndown(sanitizedHtml)
    } catch (error) {
        logger.error("Error sanitizing markdown",error);
        return "";
    }
}