import BuildContentValidations from "@components/builds/BuildContentValidations";
import BuildContentLinksUsing from "@components/builds/BuildContentLinksUsing";
import BuildContentLinksUsedBy from "@components/builds/BuildContentLinksUsedBy";
import BuildContentNotifications from "@components/builds/BuildContentNotifications";
import BuildContentPromotions from "@components/builds/BuildContentPromotions";
import {UserContext} from "@components/providers/UserProvider";
import {useContext} from "react";
import BuildContentEnvironments from "@components/builds/BuildContentEnvironments";
import GridTableContextProvider from "@components/grid/GridTableContext";
import GridTable from "@components/grid/GridTable";
import BuildContentAgents from "@components/builds/BuildContentAgents";
import {hasAgentsSection, withAgentsSection} from "@components/builds/agents/buildAgents";
import {buildPageLayout} from "@components/builds/buildPageLayout";

/**
 * Height of the *Agents* section, below the others when shown.
 */
const AGENTS_HEIGHT = 12

export default function BuildContent({build}) {

    const user = useContext(UserContext)

    let defaultLayout = buildPageLayout({environments: !!user.authorizations.environment?.view})

    // What agents had to do with this build (#2033), at the end of the page (#2053), when there is
    // something to show. Both the layout and the items are computed from the build, which is already
    // loaded: they always agree with each other, from the first render (#1634)
    const showAgents = hasAgentsSection(build)
    if (showAgents) {
        defaultLayout = withAgentsSection(defaultLayout, AGENTS_HEIGHT)
    }

    const items = [
        {
            id: "promotions",
            content: <BuildContentPromotions
                build={build}
            />,
        },
        {
            id: "validations",
            content: <BuildContentValidations
                build={build}
            />,
        },
        {
            id: "using",
            content: <BuildContentLinksUsing
                build={build}
            />,
        },
        {
            id: "usedBy",
            content: <BuildContentLinksUsedBy
                build={build}
            />,
        },
        {
            id: "notifications",
            content: <BuildContentNotifications
                build={build}
            />,
        },
    ]

    if (showAgents) {
        items.push({
            id: "agents",
            content: <BuildContentAgents
                key={build.id}
                build={build}
            />,
        })
    }

    if (user.authorizations.environment?.view) {
        items.push({
            id: "environments",
            content: <BuildContentEnvironments
                build={build}
            />,
        })
    }

    return (
        <>
            <GridTableContextProvider isDraggable={false}>
                <GridTable
                    rowHeight={30}
                    layout={defaultLayout}
                    items={items}
                    isResizable={false}
                />
            </GridTableContextProvider>
        </>
    )
}