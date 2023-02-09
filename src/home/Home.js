import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Route, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { AppTopbar } from "../AppTopbar";
import { AppMenu } from "../AppMenu";
import { AppConfig } from "../AppConfig";


import Dashboard from "../components/Dashboard";
import IndicadoresTurno from "../pages/IndicadoresTurno";
import StatusLineas from "../pages/StatusLineas";


//----------------| Catalogos |----------------
import ListadoParos from "../components/listadoParo/ListadoParos";
// import CatalogoRoles from "../pages/Catalogos/Roles/CatalogoRoles";
import CatalogoAreas from "../pages/Catalogos/Areas/CatalogoAreas";
import CatalogoTurnos from "../pages/Catalogos/Turnos/CatalogoTurnos";
import CatalogoLineas from "../pages/Catalogos/Lineas/CatalogoLineas";
import CatalogoPlantas from "../pages/Catalogos/Plantas/CatalogoPlantas";
// import CatalogoUsuarios from "../pages/Catalogos/Usuarios/CatalogoUsuarios";
import CatalogoProducto from "../pages/Catalogos/Productos/CatalogoProducto";
import CatalogoMaquinas from "../pages/Catalogos/Maquinas/CatalogoMaquinas";
// import CatalogoTipoParo from "../pages/Catalogos/TiposParo/CatalogoTipoParo";
// import CatalogoDirecciones from "../pages/Catalogos/Direcciones/CatalogoDirecciones";


import MonitorDeLineas from "../components/monitorDeLineas/MonitorDeLineas";
import VariablesDelProceso from "../components/variablesDelProceso/VariablesDelProceso"
import Desperdicio from  '../components/desperdicio/Desperdicio'

import PrimeReact from "primereact/api";
import { Tooltip } from "primereact/tooltip";

import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "../assets/demo/flags/flags.css";
import "../assets/demo/Demos.scss";
import "../assets/layout/layout.scss";
import "../App.scss";

const Home = ({ setLogueado }) => {
    const [layoutMode, setLayoutMode] = useState("static");
    const [layoutColorMode, setLayoutColorMode] = useState("light");
    const [inputStyle, setInputStyle] = useState("outlined");
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode);
    };

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode);
    };

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    };

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === "overlay") {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            } else if (layoutMode === "static") {
                setStaticMenuInactive((prevState) => !prevState);
            }
        } else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    };

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    };

    const onMobileSubTopbarMenuClick = (event) => {
        event.preventDefault();
        mobileTopbarMenuClick = true;
        // localStorage.removeItem('logueado')     // Eliminar valor para terminar sesion
        // setLogueado(false)                      // Cerrar sesion
        // console.log("Termino la sesion")    
    };

    const cerrarSesion = () => {
        localStorage.removeItem('logueado')     // Eliminar valor para terminar sesion
        setLogueado(false)                      // Cerrar sesion
        console.log("Termino la sesion")        // Mensaje de cierre de sesion
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    };
    const isDesktop = () => {
        return window.innerWidth >= 992;
    };

    const menu = [
        {
            label: "Home",
            items: [
                {
                    label: "Dashboard",
                    icon: "pi pi-fw pi-home text-blue-500",
                    to: "/",
                },
            ],
        },
        {
            label: "Tiempo Real",
            icon: "pi pi-fw pi-sitemap",
            items: [
                { label: "Status Lineas", icon: "pi pi-fw pi-clock text-blue-500 ", to: "/statusLineas" },
                { label: "Indicadores de Planta", icon: "pi pi-fw pi-clock text-blue-500 ", to: "/indicadoresTurno" },
                { label: "Monitor de Lineas", icon: "pi pi-fw pi-clock text-blue-500", to: "/monitorDeLineasTiempoReal" },
            ],
        },
        {
            label: "Reportes",
            icon: "pi pi-fw pi-sitemap",
            items: [
                { label: "Status Lineas", icon: "pi pi-fw pi-book text-blue-500 ", to: "/statusLineas" },
                { label: "Indicadores de Planta", icon: "pi pi-fw pi-book text-blue-500 ", to: "/indicadoresTurno" },
                { label: "Monitor de Lineas", icon: "pi pi-fw pi-book text-blue-500", to: "/monitorDeLineas" },
                { label: "Listado de Paros", icon: "pi pi-fw pi-book text-blue-500", to: "/listadoParos" },                
                ],
        },
        {
            label: "Graficas",
            icon: "pi pi-fw pi-sitemap",
            items: [
                { label: "Variables de Proceso", icon: "pi pi-fw pi-mobile text-blue-500", to: "/variablesDelProceso" },
                { label: "Desperdicio", icon: "pi pi-fw pi-mobile text-blue-500", to: "/desperdicio" },
            ],
        },
        {
            //CAMBIAR...
            label: "Catalogos",
            icon: "pi pi-fw pi-search ",
            items: [
                {
                    label: "Catalogo",
                    icon: "pi pi-fw pi-database text-blue-500",
                    // CAMBIAR....
                    items: [
                        { label: "Áreas", icon: "pi pi-fw pi-table text-blue-500", to: "/catalogoAreas" },
                        // { label: "Direcciones", icon: "pi pi-fw pi-table text-blue-500", to: "/catalogoDirecciones" },
                        { label: "Líneas", icon: "pi pi-fw pi-table text-blue-500", to: "/catalogoLineas" },
                        { label: "Plantas", icon: "pi pi-fw pi-table text-blue-500", to: "/catalogoPlantas" },
                        { label: "Productos", icon: "pi pi-fw pi-table text-blue-500", to: "/catalogoProductos" },
                        // { label: "Roles", icon: "pi pi-fw pi-table text-blue-500", to: "/catalogoRoles" },
                        // { label: "TipoParo", icon: "pi pi-fw pi-table text-blue-500", to: "/catalogoTipoParo" },
                        { label: "Turnos", icon: "pi pi-fw pi-table text-blue-500", to: "/catalogoTurnos" },
                        // { label: "Usuarios", icon: "pi pi-fw pi-table text-blue-500", to: "/catalogoUsuarios" },
                        {label: "Maquinas",icon: "pi pi-fw pi-bookmark text-blue-500",to: "/catalogoMaquinas",},
                        // {label: "Modo de Falla",icon: "pi pi-fw pi-bookmark text-blue-500",},
                    ],
                },
            ],
        },
        {
            label: "Configuración",
            icon: "pi pi-fw pi-sitemap",
            items: [{ label: "Configuración", icon: "pi pi-fw pi-cog text-blue-500", to: "/table" }],
        },
    ];

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };

    const wrapperClass = classNames("layout-wrapper", {
        "layout-overlay": layoutMode === "overlay",
        "layout-static": layoutMode === "static",
        "layout-static-sidebar-inactive": staticMenuInactive && layoutMode === "static",
        "layout-overlay-sidebar-active": overlayMenuActive && layoutMode === "overlay",
        "layout-mobile-sidebar-active": mobileMenuActive,
        "p-input-filled": inputStyle === "filled",
        "p-ripple-disabled": ripple === false,
        "layout-theme-light": layoutColorMode === "light",
    });

//--------------------| Valor que regresara  |--------------------
    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            <AppTopbar
                onToggleMenuClick={onToggleMenuClick}
                layoutColorMode={layoutColorMode}
                mobileTopbarMenuActive={mobileTopbarMenuActive}
                onMobileTopbarMenuClick={onMobileTopbarMenuClick}
                onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}
                cerrarSesion={cerrarSesion}
            />

            {/* Barra de navegacion */}
            <div className="layout-sidebar" onClick={onSidebarClick}>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">
                    <Route path="/" exact render={() => <Dashboard colorMode={layoutColorMode} location={location} />} />
                    <Route path="/indicadoresTurno" component={IndicadoresTurno} />
                    <Route path="/statusLineas" component={StatusLineas} />
                    <Route path="/listadoParos" component={ListadoParos} />
                    {/* <Route path="/desperdicio" component={Desperdecio} /> */}
                    {/* <Route path="/button" component={ButtonDemo} /> */}
                    <Route path="/catalogoAreas" component={CatalogoAreas} />
                    {/* <Route path="/catalogoDirecciones" component={CatalogoDirecciones} /> */}
                    <Route path="/catalogoLineas" component={CatalogoLineas} />
                    <Route path="/catalogoPlantas" component={CatalogoPlantas} />
                    <Route path="/catalogoProductos" component={CatalogoProducto} />
                    {/* <Route path="/catalogoRoles" component={CatalogoRoles} /> */}
                    {/* <Route path="/catalogoTipoParo" component={CatalogoTipoParo} /> */}
                    <Route path="/catalogoTurnos" component={CatalogoTurnos} />
                    {/* <Route path="/catalogoUsuarios" component={CatalogoUsuarios} /> */}
                    <Route path="/catalogoMaquinas" component={CatalogoMaquinas} />
                    <Route path="/desperdicio" component={Desperdicio} />
                    <Route path="/monitorDeLineas" component={()=><MonitorDeLineas tiempoReal = {false}/>}/>
                    <Route path="/monitorDeLineasTiempoReal" component={()=><MonitorDeLineas tiempoReal = {true}/>}/>
                    <Route path="/variablesDelProceso" component={VariablesDelProceso}/>
                </div>

                {/* <AppFooter layoutColorMode={layoutColorMode} /> */}
            </div>

            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange} layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>
        </div>
    );
};

export default Home;
