import {Header} from "./Header.tsx";
import {Footer} from "./Footer.tsx";
import {Outlet} from "react-router-dom";
export const MainLayout = () => {
    return (
            <div className='root__layout'>
                {/*<Header/>*/}
                <main>
                    <Outlet/>
                </main>
                {/*<Footer/>*/}
            </div>
    );
};