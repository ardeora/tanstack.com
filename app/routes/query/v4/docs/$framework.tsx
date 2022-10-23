import * as React from "react";
import { FaArrowLeft, FaArrowRight, FaDiscord, FaGithub } from "react-icons/fa";
import { CgClose, CgMenuLeft } from "react-icons/cg";
import {
  Link,
  MetaFunction,
  NavLink,
  Outlet,
  useMatches,
  useParams,
} from "@remix-run/react";
import { useReactQueryV4Config } from "../../v4";
import { gradientText } from "../index";
import { seo } from "~/utils/seo";
import { Docs, DocsConfig } from "~/components/Docs";
import { PPPBanner } from "~/components/PPPBanner";

const logo = (
  <>
    <Link to="/" className="font-light">
      TanStack
    </Link>
    <Link to=".." className={`font-bold`}>
      <span className={`${gradientText}`}>Query</span>{" "}
      <span className="text-sm align-super">v4</span>
    </Link>
  </>
);

const localMenu = {
  label: "Menu",
  children: [
    {
      label: "Home",
      to: "..",
    },
    {
      label: (
        <div className="flex items-center gap-2">
          Github <FaGithub className="text-lg opacity-20" />
        </div>
      ),
      to: "https://github.com/tanstack/query",
    },
    {
      label: (
        <div className="flex items-center gap-2">
          Discord <FaDiscord className="text-lg opacity-20" />
        </div>
      ),
      to: "https://tlinz.com/discord",
    },
  ],
};

export let meta: MetaFunction = () => {
  return seo({
    title:
      "TanStack Query Docs | React Query, Solid Query, Svelte Query, Vue Query",
  });
};

export default function RouteReactQuery() {
  let config = useReactQueryV4Config();
  let { framework } = useParams();

  const docsConfig = React.useMemo(() => {
    const frameworkMenu = config.menu.find((d) => d.framework === framework);
    if (!frameworkMenu) return null
    return {
      ...config,
      menu: [localMenu, ...frameworkMenu.menuItems],
      framework: frameworkMenu.framework,
    } as DocsConfig
  }, [framework, config])

  return (
    <>
      <PPPBanner />
      <Docs
        {...{
          logo,
          colorFrom: "from-rose-500",
          colorTo: "to-violet-500",
          textColor: "text-violet-500",
          config: docsConfig!,
          framework: docsConfig!.framework,
        }}
      />
    </>
  );
}