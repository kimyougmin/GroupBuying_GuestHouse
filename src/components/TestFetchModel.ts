import {CardType} from "../types/CardType";

export default function TestFetchModel(): CardType {
    return {
        houseImages: [{url:"https://i.postimg.cc/zBQ5bx80/house1.jpg"}, {url:"https://i.postimg.cc/gcfX1D8V/house2.jpg"}, {url:"https://i.postimg.cc/0jJvp7Nx/house3.jpg"}, {url:"https://i.postimg.cc/t7QjD716/house4.jpg"}, {url:"https://i.postimg.cc/xjkNs7Jj/house5.jpg"}],
        houseName: "한국 숙소 오션 뷰",
        id: 0,
        price: 45000,
        like: false
    }
}