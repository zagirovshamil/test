import organizationLogo from "../../assets/svg/organization.svg";
import logo from "../../assets/svg/logo.svg";
import "./header.scss";

export const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="header-content__logo">BitTest</div>
          <div className="header-content__item">
            <img src={organizationLogo} alt="organization" />
            Моя организация
          </div>
        </div>
        <div className="header-user">
          <img className="header-user__logo" src={logo} alt="logo" />
          <div className="header-user__content">
            <span className="header-user__content-auth">Вы авторизованы</span>
            <span className="header-user__content-role">Администратор</span>
          </div>
        </div>
      </header>
    </>
  );
};
