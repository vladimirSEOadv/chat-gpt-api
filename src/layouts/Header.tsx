import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { Button } from "antd";

export const Header = () => {
  const links = [{ linkName: "Full resp", url: "/full" }];

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.navigation}>
          <ul className={styles["navigation-list"]}>
            {links.map((link) => {
              return (
                <li>
                  <Button type={"link"}>
                    <Link className={styles.link} to={link.url}>
                      {link.linkName}
                    </Link>
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};
