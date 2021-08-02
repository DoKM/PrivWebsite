export { TitleBarScroller };
class TitleBarScroller {
    constructor(titles, dom, window) {
        this.titles = titles;
        this.dom = dom;
        this.window = window;
        this.currentTitle = { title: titles[0], index: 0, currentLength: 0 };
        this.betterTitleScroll();
    }
    betterTitleScroll() {
        let here = this;
        const next = this.scroll(this.currentTitle);
        if (next) {
            this.currentTitle = this.getNextTitle(this.currentTitle);
        }
        this.window.setTimeout(here.betterTitleScroll, next ? 3000 : 750);
    }
    scroll({ title, currentLength }) {
        const test = '_________________________________';
        const titleMessage = title.substr(0, currentLength).concat(test.substr(currentLength, title.length - currentLength));
        let nexttitle = false;
        currentLength++;
        if (currentLength === title.length + 1) {
            currentLength = 0;
            nexttitle = true;
        }
        this.dom.title = titleMessage;
        return nexttitle;
    }
    getNextTitle({ index }) {
        if (index === this.titles.length - 1) {
            return { title: this.titles[0], index: 0, currentLength: 0 };
        }
        return { title: this.titles[index + 1], index: index + 1, currentLength: 0 };
    }
}
