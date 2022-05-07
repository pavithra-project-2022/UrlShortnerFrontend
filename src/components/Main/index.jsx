import styles from "./styles.module.css";
import './main.css'
import InputShortener from "./InputShortener";
import BackgroundAnimate from "./BackgroundAnimate";
import { useNavigate } from "react-router-dom";

const Main = () => {
	const navigate = useNavigate()
	
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate('/signup');

	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Dashboard</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<div className="containerr">
		 
		<InputShortener />
		<BackgroundAnimate />
		
	  </div>
		</div>
	);
};

export default Main;

