import {Link} from "react-router-dom";
import { Logo  } from "../Logo/Logo";
import {
    BalloonHeart, 
    Cart4, 
    PersonCircle, 
    BuildingUp 
} from "react-bootstrap-icons";

import Search from "../Search";
const Header = ({
        user, 
        upd, 
        searchArr,
        setGoods, 
        setSearchResult,
        setModalOpen
    }) => {
    const login = () => {
        setModalOpen(true)
    }
    return <header>
        <Logo/>
       <Search 
            data={searchArr} 
            setGoods={setGoods} 
            setSearchResult={setSearchResult}
        />
        <nav className="header__menu">
            {user && <>
                <Link to="/">
                    <BalloonHeart title="Избранное"/>
                </Link>
                <Link to="/">
                    <Cart4  title="Корзина"/>
                </Link>
                <Link to="/profile">
                    <PersonCircle  title="Личный кабинет"/>
                </Link>
            </>}
            <span>
                {!user && <BuildingUp  title="Войти" onClick={login}/>}
            </span>
        </nav>
        <div className="catalog">
            {user && (
                <div>
                    <h1 className="craft">Крафтовые <br /> лакомства для <br /> собак</h1>
                    <p className="p-catalog">Всегда свежие лакомства ручной <br /> работы с доставкой по России и Миру для</p>
                    <Link to="/catalog">
                        <button className="btn-catalog">Каталог</button>
                    </Link>
                </div>
            )}
        </div>
    </header>
}

export default Header;