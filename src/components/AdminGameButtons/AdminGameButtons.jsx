import styles from './AdminGameButtons.module.css'

export default function AdminGameButtons({game, noBtn, setNoBtn, noReason, handleApproved}){
    return(
        <div className={styles.Admin}>
            {
            // if admin has already rejected the game before
                game.reason ?
                <>
                    <h4>Previous Comment:</h4>
                    <div>
                        <p>{game.reason}</p>
                    </div>
                    <>
                        <h5>Approved?</h5>
                        <btns className={styles.Buttons}>
                            <button className="btn yes-btn" onClick={(evt) => {handleApproved(evt, 'yes')}}>Yes</button>
                            <button className="btn no-btn" onClick={() => {setNoBtn(true)}}>No</button>
                        </btns> 
                    </>
                </> :
                // if game hasn't been rejected before
                <>
                    <h5 style={{marginBottom: '10px'}}>Approved?</h5>
                    <btns className={styles.Buttons}>
                        <button className="btn yes-btn" onClick={(evt) => {handleApproved(evt, 'yes')}}>Yes</button>
                        <button className="btn no-btn" onClick={(evt) => {setNoBtn(true)}}>No</button>
                    </btns> 
                </>
            }
            {
                // if admin didn't approve the game show the text box to give reasons why
                noBtn &&
                <form onSubmit={(evt) => {handleApproved(evt, 'no')}}>
                    <label>Explain what needs to be changed</label>
                    <textarea cols="40" rows="3" ref={noReason} required></textarea>
                    <btns className={styles.Buttons}>
                        <button type="submit" className="btn yes-btn">Submit</button>
                        <button className="btn no-btn" onClick={() => {setNoBtn(false)}}>Cancel</button>
                    </btns>
                </form> 
            }
        </div>
    )
}