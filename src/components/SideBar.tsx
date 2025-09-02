const SideBar = (props) => {
    
    return (
        <div className="sidebar d-flex flex-column p-3 bg-light" style={{ width: '250px', height: '100vh'}}>
            <a href="#" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">Blog Educa</a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a className="nav-link">Início</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">Usuários</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">Categorias</a>
                </li>
            </ul>
        </div>
    )
};

export default SideBar;