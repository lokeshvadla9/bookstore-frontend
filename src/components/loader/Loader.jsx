import { CircularProgress } from "@mui/material";
export const Loader =() => {
    return (
        <div style={{ 
            display: "flex", 
            alignItems: "center",
            justifyContent: 'center',
            height: '100%'
            }}>
              <CircularProgress />
            </div>
    )
}