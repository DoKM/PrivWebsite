
export { TitleBarScroller }
class TitleBarScroller{
    
    constructor(titles: string[], dom: Document, window:Window){
        this.titles = titles;
        this.dom = dom;
        this.window = window;
        this.currentTitle = {title:titles[0], index:0, currentLength:0};
        
        this.betterTitleScroll();
    }

    
    private dom: Document;
    private window:Window

    private readonly titles:string[]

    private currentTitle:Title

    

    private betterTitleScroll() {
    
        const next:boolean = this.scroll();

        this.window.setTimeout(() => {this.betterTitleScroll()}, next ? 3000 : 750);
    }
    
    
    
    private scroll():boolean {
        const title = this.currentTitle.title

        const test = '_________________________________';
    
        const titleMessage = title.substr(0, this.currentTitle.currentLength).concat(test.substr(this.currentTitle.currentLength, title.length - this.currentTitle.currentLength));
    
        this.currentTitle.currentLength++;
        this.dom.title = titleMessage;
        if (this.currentTitle.currentLength === title.length + 1) {
            this.currentTitle = this.getNextTitle(this.currentTitle)
            return true;
        }
        return false;
    }
    
    private getNextTitle({index}: {index:number}):Title{
        if(index === this.titles.length-1){
            return {title:this.titles[0], index:0, currentLength:0}
        }

        return {title:this.titles[index+1], index:index+1, currentLength:0}
    }

    
}

interface Title{
    title:string,
    index:number,
    currentLength: number
}