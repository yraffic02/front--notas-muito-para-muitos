import Link from "next/link"

export const Header = ()=>{
    return(
        <header className="d-flex justify-content-between align-items-center mb-4 p-4">
            <h1 className="m-0 fs-4">
                Lista de Notas
            </h1>
            <nav>
                <Link href="/register/grades" className="me-3">
                    Criar notas
                </Link>
                <Link href="/register/tags">
                    Criar tags
                </Link>
            </nav>
        </header>
    )
}