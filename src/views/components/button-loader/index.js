import { Spinner } from "reactstrap"


const  ButtonLoader=(props)=>{
    return(
        <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <div style={{margin:'2px'}}>
                    <Spinner
                        style={{
                            width: "10px",
                            height: "10px"
                        }}
                        type="grow"
                        size="sm"
                    />
                </div>
                <div style={{margin:'2px'}}>
                    <Spinner
                        style={{
                            width: "10px",
                            height: "10px"
                        }}
                        type="grow"
                        size="sm"
                    />
                </div>
                <div style={{margin:'2px'}}>
                    <Spinner
                        style={{
                            width: "10px",
                            height: "10px"
                        }}
                        type="grow"
                        size="sm"
                    />
                </div>
        </div>
    )
}
export default ButtonLoader