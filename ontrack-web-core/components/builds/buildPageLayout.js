/**
 * Default layout of the build page, on a grid of 12 columns, without the *Agents* section (see
 * `withAgentsSection`).
 *
 * The left column - *Promotions*, and *Environments* below it when the user can see environments -
 * fills the height of *Validations* next to it, so that no space is lost under it (#2054). With the
 * environments, both share the column half and half: two stacked cells of heights `a` and `b`, with
 * the grid's margin between them, are exactly as tall as one cell of height `a + b`, so the height
 * of *Validations* is even.
 *
 * @param environments `true` when the *Environments* section is shown
 */
export const buildPageLayout = ({environments}) => {
    if (environments) {
        return [
            {i: "promotions", x: 0, y: 0, w: 5, h: 8},
            {i: "environments", x: 0, y: 8, w: 5, h: 8},
            {i: "validations", x: 5, y: 0, w: 7, h: 16},
            {i: "using", x: 0, y: 16, w: 6, h: 9},
            {i: "usedBy", x: 6, y: 16, w: 6, h: 9},
            {i: "notifications", x: 0, y: 25, w: 12, h: 9},
        ]
    } else {
        return [
            {i: "promotions", x: 0, y: 0, w: 4, h: 9},
            {i: "validations", x: 4, y: 0, w: 8, h: 9},
            {i: "using", x: 0, y: 9, w: 6, h: 9},
            {i: "usedBy", x: 6, y: 9, w: 6, h: 9},
            {i: "notifications", x: 0, y: 18, w: 12, h: 9},
        ]
    }
}
