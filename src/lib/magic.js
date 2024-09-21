import { Magic } from "magic-sdk";
import { OAuthExtension } from '@magic-ext/oauth2';

export const magic = new Magic(process.env.MAGIC_API_KEY, {
    extensions: [new OAuthExtension()],
});