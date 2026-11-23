import 'bulma/css/bulma.min.css';
import '../Css/AddExpenseForm.css';
import { sendData } from '../APIs/Expense';

function AddExpenseForm(props) {
    const { showForm, setShowForm, setRefresh, setMessage } = props;

    const closeModal = () => {
        setShowForm(false);
    };

    const formData = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const data = new FormData(form);

        const transactionData = {
            transactionType: data.get("transactionType"),
            amount: data.get("amount"),
            category: data.get("category"),
            paymentMethod: data.get("paymentMethod"),
            expenseDate: data.get("expenseDate"),
            expenseTime: data.get("expenseTime"),
            source: "MANUAL",
            description: data.get("description"),
        };

        try {
            await sendData(transactionData);
            setShowForm(false);
            setRefresh(e => e + 1);
            setMessage("Added Successfully..!");
        } catch (error) {
            setMessage("Something went wrong..!");
        }

        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    return (
        <div className={`modal expense-modal ${showForm ? "is-active" : ""}`}>

            <div
                className="modal-background"
                onClick={closeModal}
            ></div>

            <div className="modal-card expense-modal-card">

                {/* Header */}
                <header className="modal-card-head expense-modal-header">
                    <div>
                        <p className="modal-card-title">
                            Add Transaction
                        </p>
                        <p className="expense-modal-subtitle">
                            Record your income or expenses
                        </p>
                    </div>

                    <button
                        type="button"
                        className="delete"
                        aria-label="close"
                        onClick={closeModal}
                    ></button>
                </header>

                <form onSubmit={formData} className="expense-form">

                    {/* Body */}
                    <section className="modal-card-body expense-modal-body">

                        <div className="expense-form-grid">

                            {/* Transaction Type */}
                            <div className="expense-field">
                                <label className="label">
                                    Transaction Type
                                </label>

                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            name="transactionType"
                                            defaultValue="SENT"
                                        >
                                            <option value="SENT">
                                                Money Sent (Expense)
                                            </option>
                                            <option value="RECEIVED">
                                                Money Received (Income)
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Amount */}
                            <div className="expense-field">
                                <label className="label">
                                    Amount (₹)
                                </label>

                                <div className="control">
                                    <input
                                        className="input"
                                        type="number"
                                        name="amount"
                                        placeholder="Enter amount"
                                        min="0.01"
                                        step="0.01"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Category */}
                            <div className="expense-field">
                                <label className="label">
                                    Category
                                </label>

                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            name="category"
                                            defaultValue=""
                                            required
                                        >
                                            <option value="" disabled>
                                                Select category
                                            </option>
                                            <option value="Food">Food</option>
                                            <option value="Rent">Rent</option>
                                            <option value="EMI">EMI</option>
                                            <option value="Travel">Travel</option>
                                            <option value="Shopping">Shopping</option>
                                            <option value="Salary">Salary</option>
                                            <option value="Fashion">Fashion</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="expense-field">
                                <label className="label">
                                    Payment Method
                                </label>

                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            name="paymentMethod"
                                            defaultValue=""
                                            required
                                        >
                                            <option value="" disabled>
                                                Select payment method
                                            </option>
                                            <option value="UPI">UPI</option>
                                            <option value="Cash">Cash</option>
                                            <option value="Card">Card</option>
                                            <option value="Bank Transfer">
                                                Bank Transfer
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="expense-field">
                                <label className="label">Date</label>

                                <div className="control">
                                    <input
                                        className="input"
                                        type="date"
                                        name="expenseDate"
                                        defaultValue={new Date().toLocaleDateString("en-CA")}
                                        max={new Date().toLocaleDateString("en-CA")}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Time */}
                            <div className="expense-field">
                                <label className="label">Time</label>

                                <div className="control">
                                    <input
                                        className="input"
                                        type="time"
                                        name="expenseTime"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="expense-field expense-field-full">
                                <label className="label">
                                    Description
                                </label>

                                <div className="control">
                                    <textarea
                                        className="textarea"
                                        name="description"
                                        placeholder="What was this transaction for?"
                                        rows="3"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Receipt */}
                            <div className="expense-field expense-field-full">
                                <label className="label">
                                    Bill / Receipt (Optional)
                                </label>

                                <div className="control">
                                    <input
                                        className="input expense-file-input"
                                        type="file"
                                        name="receipt"
                                        accept="image/*,.pdf"
                                    />
                                </div>

                                <p className="help">
                                    Upload an image or PDF of your receipt.
                                </p>
                            </div>

                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="modal-card-foot expense-modal-footer">

                        <button
                            className="button expense-cancel-btn"
                            type="button"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>

                        <button
                            className="button expense-save-btn"
                            type="submit"
                        >
                            Save Transaction
                        </button>

                    </footer>

                </form>
            </div>
        </div>
    );
}

export default AddExpenseForm;
