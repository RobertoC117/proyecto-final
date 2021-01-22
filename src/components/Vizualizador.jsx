import React from 'react'
import aviso from '../files/aviso_privacidad.pdf'

const Vizualizador = () => {
    // const [numPages, setNumePages] = React.useState(null);
    // const [pageNumber, setPageNumber] = React.useState(1);

    // const onDocumentLoad = ({numPages}) =>{
    //     setNumePages(numPages)
    // }

    // const prevPage = () =>{
    //     setPageNumber(pageNumber - 1)
    // }

    // const nextPage = () =>{
    //     setPageNumber(pageNumber + 1)
    // }
    return (
        <div style={{position:'absolute', width:"100%", height:"100%"}}>
            {/* <nav>
                <button onClick={prevPage}>Prev</button>
                <button onClick={nextPage}>Next</button>
            </nav>
            <div  style={{width: 600}}>
                <Document file={aviso} onLoadSuccess={onDocumentLoad} onLoadError={(error) => console.log(error)}>
                    <Page pageNumber={pageNumber} width={600}/>
                </Document>
                
            </div>
            <p>Pagina {pageNumber} de {numPages}</p> */}
            <object 
                    data={aviso}
                    type={"application/pdf"}
                    width={"100%"}
                    height={"100%"}
            >

            </object>
        </div>
    )
}

export default Vizualizador
