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
        const next = this.scroll();
        this.window.setTimeout(() => { this.betterTitleScroll(); }, next ? 3000 : 750);
    }
    scroll() {
        const title = this.currentTitle.title;
        const test = '_________________________________';
        const titleMessage = title.substr(0, this.currentTitle.currentLength).concat(test.substr(this.currentTitle.currentLength, title.length - this.currentTitle.currentLength));
        this.currentTitle.currentLength++;
        this.dom.title = titleMessage;
        if (this.currentTitle.currentLength === title.length + 1) {
            this.currentTitle = this.getNextTitle(this.currentTitle);
            return true;
        }
        return false;
    }
    getNextTitle({ index }) {
        if (index === this.titles.length - 1) {
            return { title: this.titles[0], index: 0, currentLength: 0 };
        }
        return { title: this.titles[index + 1], index: index + 1, currentLength: 0 };
    }
}
