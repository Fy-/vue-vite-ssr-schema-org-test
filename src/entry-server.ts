import { createApp } from './main';
import { renderToString } from '@vue/server-renderer';
import { renderHeadToString } from '@vueuse/head';

export interface SSRResult {
  initial?: any;
  uuid?: string;
  meta?: string;
  link?: string;
  bodyAttributes?: string;
  htmlAttributes?: string;
  bodyTags?: string;
  app?: string;
  statusCode?: number;
  redirect?: string;
}

export async function render(url: string, cb: Function) {
  const { app, router, head } = await createApp(true);
  await router.push(url);
  await router.isReady();
  const result: SSRResult = {};

  const html = await renderToString(app, {});
  const { headTags, htmlAttrs, bodyAttrs, bodyTags } = await renderHeadToString(
    head
  );

  result.meta = headTags;
  result.bodyAttributes = bodyAttrs;
  result.htmlAttributes = htmlAttrs;
  result.bodyTags = bodyTags;
  result.app = html;
  cb(result);
  return result;
}
