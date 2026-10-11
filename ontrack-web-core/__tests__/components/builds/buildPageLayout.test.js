import {buildPageLayout} from "@components/builds/buildPageLayout"

const cell = (layout, id) => layout.find(it => it.i === id)
const bottom = (it) => it.y + it.h

describe('Default layout of the build page', () => {

    describe('with environments', () => {

        const layout = buildPageLayout({environments: true})
        const promotions = cell(layout, "promotions")
        const environments = cell(layout, "environments")
        const validations = cell(layout, "validations")

        it('stacks promotions and environments in the left column, next to validations', () => {
            expect(promotions.x).toBe(0)
            expect(environments.x).toBe(0)
            expect(environments.y).toBe(bottom(promotions))
            expect(validations.x).toBe(promotions.w)
            expect(validations.x + validations.w).toBe(12)
        })

        it('fills the height of validations with the left column', () => {
            expect(promotions.y).toBe(validations.y)
            expect(bottom(environments)).toBe(bottom(validations))
        })

        it('shares the left column half and half', () => {
            expect(promotions.h).toBe(environments.h)
        })

        it('puts the other sections below', () => {
            for (const id of ["using", "usedBy", "notifications"]) {
                expect(cell(layout, id).y).toBeGreaterThanOrEqual(bottom(validations))
            }
        })
    })

    describe('without environments', () => {

        const layout = buildPageLayout({environments: false})
        const promotions = cell(layout, "promotions")
        const validations = cell(layout, "validations")

        it('has no environments section', () => {
            expect(cell(layout, "environments")).toBeUndefined()
        })

        it('lets promotions fill the height of validations', () => {
            expect(promotions.y).toBe(validations.y)
            expect(promotions.h).toBe(validations.h)
        })

        it('puts validations right of promotions, within the grid', () => {
            expect(validations.x).toBe(promotions.w)
            expect(validations.x + validations.w).toBe(12)
        })

        it('puts the other sections below', () => {
            for (const id of ["using", "usedBy", "notifications"]) {
                expect(cell(layout, id).y).toBeGreaterThanOrEqual(bottom(validations))
            }
        })
    })
})
