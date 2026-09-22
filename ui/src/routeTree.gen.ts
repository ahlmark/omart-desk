/* eslint-disable */

// @ts-nocheck

import { Route as rootRouteImport } from "./routes/__root";
import { Route as IndexRouteImport } from "./routes/index";
import { Route as GossipRouteImport } from "./routes/gossip";
import { Route as PalsRouteImport } from "./routes/pals";
import { Route as PublishRouteImport } from "./routes/publish";
import { Route as PluginIdRouteImport } from "./routes/plugin.$id";

const IndexRoute = IndexRouteImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRouteImport,
} as any);
const GossipRoute = GossipRouteImport.update({
  id: "/gossip",
  path: "/gossip",
  getParentRoute: () => rootRouteImport,
} as any);
const PalsRoute = PalsRouteImport.update({
  id: "/pals",
  path: "/pals",
  getParentRoute: () => rootRouteImport,
} as any);
const PublishRoute = PublishRouteImport.update({
  id: "/publish",
  path: "/publish",
  getParentRoute: () => rootRouteImport,
} as any);
const PluginIdRoute = PluginIdRouteImport.update({
  id: "/plugin/$id",
  path: "/plugin/$id",
  getParentRoute: () => rootRouteImport,
} as any);

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "/gossip": typeof GossipRoute;
  "/pals": typeof PalsRoute;
  "/publish": typeof PublishRoute;
  "/plugin/$id": typeof PluginIdRoute;
}
export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "/gossip": typeof GossipRoute;
  "/pals": typeof PalsRoute;
  "/publish": typeof PublishRoute;
  "/plugin/$id": typeof PluginIdRoute;
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport;
  "/": typeof IndexRoute;
  "/gossip": typeof GossipRoute;
  "/pals": typeof PalsRoute;
  "/publish": typeof PublishRoute;
  "/plugin/$id": typeof PluginIdRoute;
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: "/" | "/gossip" | "/pals" | "/publish" | "/plugin/$id";
  fileRoutesByTo: FileRoutesByTo;
  to: "/" | "/gossip" | "/pals" | "/publish" | "/plugin/$id";
  id: "__root__" | "/" | "/gossip" | "/pals" | "/publish" | "/plugin/$id";
  fileRoutesById: FileRoutesById;
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  GossipRoute: typeof GossipRoute;
  PalsRoute: typeof PalsRoute;
  PublishRoute: typeof PublishRoute;
  PluginIdRoute: typeof PluginIdRoute;
}

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexRouteImport;
      parentRoute: typeof rootRouteImport;
    };
    "/gossip": {
      id: "/gossip";
      path: "/gossip";
      fullPath: "/gossip";
      preLoaderRoute: typeof GossipRouteImport;
      parentRoute: typeof rootRouteImport;
    };
    "/pals": {
      id: "/pals";
      path: "/pals";
      fullPath: "/pals";
      preLoaderRoute: typeof PalsRouteImport;
      parentRoute: typeof rootRouteImport;
    };
    "/publish": {
      id: "/publish";
      path: "/publish";
      fullPath: "/publish";
      preLoaderRoute: typeof PublishRouteImport;
      parentRoute: typeof rootRouteImport;
    };
    "/plugin/$id": {
      id: "/plugin/$id";
      path: "/plugin/$id";
      fullPath: "/plugin/$id";
      preLoaderRoute: typeof PluginIdRouteImport;
      parentRoute: typeof rootRouteImport;
    };
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  GossipRoute: GossipRoute,
  PalsRoute: PalsRoute,
  PublishRoute: PublishRoute,
  PluginIdRoute: PluginIdRoute,
};
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();
