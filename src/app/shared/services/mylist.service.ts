import { Injectable, signal} from '@angular/core';


@Injectable({  providedIn: 'root',})

export class MyListService { 
    list = signal<{id:number, type:"movie" | "tv"}[]>(this.getData('list') !== null
    ? JSON.parse(localStorage.getItem('list')!)
    : [{ id: 512200, type: "movie" },{ id: 671, type: "movie" }, { id: 673, type: "movie" }])
    
    liked = signal<number[]>(this.getData('liked') !== null
    ? JSON.parse(localStorage.getItem('liked')!)
    : [])

    private saveData(key: string, value: string) {
        localStorage.setItem(key, value);
    }
    private getData(key: string) {
        return localStorage.getItem(key)
    }

    public isInList(id:number){
        return this.list().some(elem => elem.id === id);
    }

    public addToList(id:number, type: "movie" | "tv") {
        this.list.set([...this.list(), {id:id, type:type}])
        this.saveData('list', JSON.stringify(this.list()))
    }
    
    public RemoveFromList(id:number) {
        const idx = this.list().findIndex(elem => elem.id === id)
        const arr = [...this.list()]
        arr.splice(idx, 1)
        this.list.set(arr)
        this.saveData('list', JSON.stringify(this.list()))
    }


    public isLiked(id:number){
        return this.liked().includes(id);
    }

    public addLike(id: number) {
        this.liked.set([...this.liked(), id])
        this.saveData("liked", JSON.stringify(this.liked()))
    }

    public removeLike(id: number) {
        const idx = this.liked().findIndex(id => id === id)
        const arr = [...this.liked()]
        arr.splice(idx,1)
        this.liked.set(arr)
        this.saveData("liked", JSON.stringify(this.liked()))
    }

    
}