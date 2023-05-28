import {Link} from "react-router-dom";
import {Journals} from "react-bootstrap-icons";
import Slider from "../components/Slider";
import foodImg from "../assents/images/food.png";
import foodImgF from "../assents/images/food1.png";
import foodImgS from "../assents/images/food2.png";

const Home = ({user, setActive}) => {
	return <>
		<div className="info">
			
			{!user && <>
				<span className="info-link" onClick={() => setActive(true)}>Авторизуйтесь</span>,
				чтобы получить доступ к сайту</>}
		</div>
		<div className="dog-food">
			<div>
				<h1 className="h1-dog-food">Подарок за <br /> первый заказ!</h1>
				<p className="p-doog-food">Легкое говяжье - пластины</p>
			</div>
			<img className="img-dog-food" src={foodImg} alt="DogFood" />
		</div>
		<Slider desktop={3} mobile={2}/>
		<div className="mainDiv">
			<div className="advertisement1">
				<div className="block">
					<h1 className="h1-dog-food">Рога <br /> серверного <br /> оленя</h1>
					<p className="p-doog-food">от 10 до 30 кг</p>
				</div>
				<img className="img-dog-food" src={foodImgF} alt="DogFood" />
			</div>
			<div className="advertisement2">
				<div className="block">
					<h1 className="h1-dog-food">Слипы из <br /> шеи индейки</h1>
					<p className="p-doog-food">100% натуральное</p>
				</div>
				<img className="img-dog-food" src={foodImgS} alt="DogFood" />
			</div>
		</div>
	</>
}

export default Home;