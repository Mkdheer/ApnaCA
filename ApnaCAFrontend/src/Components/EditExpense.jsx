import 'bulma/css/bulma.min.css';
import '../Css/AddExpenseForm.css';
import { updateById } from '../APIs/Expense'; 

function EditExpense(props) {

    const {
        editFormData,
        setEditForm,
        setRefresh,
        setMsg
    } = props;

    const closeModal = () => {
        setEditForm(false);
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
            expenseDate: editFormData.expenseDate,
            expenseTime: data.get("expenseTime"),
            source: editFormData.source || "MANUAL",
            description: data.get("description")
        };

        try {
            await updateById(editFormData.id, transactionData);

            setEditForm(false);
            setRefresh(prev => prev + 1);
            setMsg("Transaction updated successfully!");
            setTimeout(() => setMsg(""), 3000);
        

        } catch (error) {
            console.log("Update failed:", error);

            if (setMessage) {
                setMessage("Something went wrong!");
                setTimeout(() => setMessage(""), 3000);
            }
        }
    };

    return (
        <div className="modal expense-modal is-active">

            <div
                className="modal-background"
                onClick={closeModal}
            ></div>

            <div className="modal-card expense-modal-card">

                {/* Header */}
                <header className="modal-card-head expense-modal-header">
                    <div>
                        <p className="modal-card-title">
                            Edit Transaction
                        </p>
                        <p className="expense-modal-subtitle">
                            Update your income or expense details
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
                                            defaultValue={editFormData.transactionType}
                                            required
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
                                <label className="label">Amount (₹)</label>

                                <div className="control">
                                    <input
                                        className="input"
                                        type="number"
                                        name="amount"
                                        defaultValue={editFormData.amount}
                                        min="0.01"
                                        step="0.01"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Category */}
                            <div className="expense-field">
                                <label className="label">Category</label>

                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            name="category"
                                            defaultValue={editFormData.category}
                                            required
                                        >
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
                                <label className="label">Payment Method</label>

                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            name="paymentMethod"
                                            defaultValue={editFormData.paymentMethod}
                                            required
                                        >
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

                            {/* Date - Non Editable */}
                            <div className="expense-field">
                                <label className="label">
                                    Date (Cannot be changed)
                                </label>

                                <div className="control">
                                    <input
                                        className="input"
                                        type="date"
                                        name="expenseDate"
                                        value={editFormData.expenseDate || ""}
                                        readOnly
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
                                        defaultValue={editFormData.expenseTime || ""}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="expense-field expense-field-full">
                                <label className="label">Description</label>

                                <div className="control">
                                    <textarea
                                        className="textarea"
                                        name="description"
                                        defaultValue={editFormData.description || ""}
                                        placeholder="What was this transaction for?"
                                        rows="3"
                                    ></textarea>
                                </div>
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
                            Update Transaction
                        </button>

                    </footer>

                </form>
            </div>
        </div>
    );
}

export default EditExpense;