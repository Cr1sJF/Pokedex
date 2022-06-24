

export class ApiResponse {
    success: boolean;
    data: any;
    hasNext: boolean;
    next: string;

    constructor(res:any){
        this.success = res.status == 200;
        this.hasNext = res.data.next ? true:false;
        this.next = res.data.next;

        this.data = res.data.data || res.data.items || res.data.results;
    }
}