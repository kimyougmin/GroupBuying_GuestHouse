import {CardType} from "../types/CardType";
import img1 from "../TestModel/images/IMG_1225.jpeg"
import img2 from "../TestModel/images/IMG_1229.jpeg"
import img3 from "../TestModel/images/IMG_1236.jpeg"
import img4 from "../TestModel/images/IMG_1297.jpeg"
import img5 from "../TestModel/images/IMG_1111.jpg"

export default async function GuestHouseDate() {

    const data: CardType = {
        houseImages: [{'url': img1},{'url': img2}, {'url': img3}, {'url': img4}, {'url': img5}],
        id: 123123,
        houseName: "string",
        price: 1111,
        like: false
    };
    return data;
}