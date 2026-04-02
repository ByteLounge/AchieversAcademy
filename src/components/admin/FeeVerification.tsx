import { useState, useEffect } from 'react'
import { Check, X, Eye, FileText, Loader } from 'lucide-react'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { generatePDF } from '../../utils/pdfUtils'

export default function FeeVerification() {
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending')
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPayments = async () => {
    setLoading(true)
    try {
      const snap = await getDocs(collection(db, 'payments'))
      setPayments(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch(e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPayments()
  }, [])

  const pendingPayments = payments.filter(p => p.status === 'pending')
  const verifiedPayments = payments.filter(p => p.status === 'verified')

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'payments', id), { status: newStatus })
      fetchPayments() // refresh
    } catch(e) {
      console.error(e)
    }
  }
  
  const handleGenerateReceipt = (payId: string, payment: any) => {
    const studentName = payment.student || 'Unknown'
    let gradeDisplay = payment.grade || ''
    // Try to format grade as roman numeral if straightforward (up to 10)
    const romanMap: any = { '5': 'V', '6': 'VI', '7': 'VII', '8': 'VIII', '9': 'IX', '10': 'X' }
    if (romanMap[gradeDisplay]) gradeDisplay = romanMap[gradeDisplay]
    
    const mobile = payment.mobile || 'N/A'
    const isGrade10 = payment.grade === '10'
    const amountStr = payment.amount || 'Rs.11000/-'

    const renderInstallmentRows = () => {
      const sigSvg = `<svg width="30" height="20" viewBox="0 0 40 20"><path d="M 5,10 Q 15,0 20,10 T 35,0" fill="transparent" stroke="black" stroke-width="1.5"/><circle cx="20" cy="7" r="1.5" fill="black"/></svg>`
      if (isGrade10) {
        return `
          <tr>
            <td style="padding: 8px; border: 1px solid #000; font-weight: bold; font-style: italic;">1<sup>st</sup> installment</td>
            <td style="padding: 8px; border: 1px solid #000; text-align: center;">Rs.5500/-</td>
            <td style="padding: 8px; border: 1px solid #000; text-align: center;">17/03/2025</td>
            <td style="padding: 8px; border: 1px solid #000; text-align: center;">${sigSvg}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #000; font-weight: bold; font-style: italic;">2<sup>nd</sup> installment</td>
            <td style="padding: 8px; border: 1px solid #000; text-align: center;">Rs.5500/-</td>
            <td style="padding: 8px; border: 1px solid #000; text-align: center;">24/07/2025</td>
            <td style="padding: 8px; border: 1px solid #000; text-align: center;">${sigSvg}</td>
          </tr>
        `
      }
      return `
        <tr>
          <td style="padding: 8px; border: 1px solid #000; font-weight: bold; font-style: italic;">1<sup>st</sup> installment</td>
          <td style="padding: 8px; border: 1px solid #000; text-align: center;">Rs.3000/-</td>
          <td style="padding: 8px; border: 1px solid #000; text-align: center;">17/03/2025</td>
          <td style="padding: 8px; border: 1px solid #000; text-align: center;">${sigSvg}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #000; font-weight: bold; font-style: italic;">2<sup>nd</sup> installment</td>
          <td style="padding: 8px; border: 1px solid #000; text-align: center;">Rs.4000/-</td>
          <td style="padding: 8px; border: 1px solid #000; text-align: center;">24/07/2025</td>
          <td style="padding: 8px; border: 1px solid #000; text-align: center;">${sigSvg}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #000; font-weight: bold; font-style: italic;">3<sup>rd</sup> installment</td>
          <td style="padding: 8px; border: 1px solid #000; text-align: center;">Rs.4000/-</td>
          <td style="padding: 8px; border: 1px solid #000; text-align: center;">07/11/2025</td>
          <td style="padding: 8px; border: 1px solid #000; text-align: center;">${sigSvg}</td>
        </tr>
      `
    }

    const hiddenDiv = document.createElement('div')
    hiddenDiv.id = `receipt-${payId}`
    hiddenDiv.style.position = 'absolute'
    hiddenDiv.style.left = '-9999px'
    hiddenDiv.style.top = '0'
    hiddenDiv.innerHTML = `
      <div style="width: 500px; padding: 10px; background-color: #000;">
        <div style="padding: 4px; background-color: #A3B8CC; border: 2px solid #000; position: relative; overflow: hidden; font-family: 'Inter', sans-serif; color: #000;">
          
          <!-- Watermark -->
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 60px; font-weight: bold; color: rgba(0,0,0,0.06); white-space: nowrap; pointer-events: none; text-transform: uppercase;">
            FEE CARD 2025-26
          </div>

          <div style="text-align: center; padding-top: 30px;">
            <div style="display: inline-block; background: linear-gradient(to bottom, #d2f0fe, #fff); padding: 10px; width: 140px; height: 110px;">
              <svg width="120" height="90" viewBox="0 0 120 90">
                <polygon points="60,0 20,60 55,55" fill="#1e6878"/>
                <polygon points="60,0 55,55 65,55" fill="#f0ad00"/>
                <polygon points="60,0 65,55 100,60" fill="#d9252a"/>
                <text x="60" y="70" font-family="'Inter', sans-serif" font-weight="bold" font-size="9" fill="#00a79d" text-anchor="middle">THE</text>
                <text x="60" y="82" font-family="'Inter', sans-serif" font-weight="900" font-size="14" fill="#03b6ad" text-anchor="middle">ACHIEVER'S</text>
                <text x="60" y="90" font-family="'Inter', sans-serif" font-size="5" fill="#e3000f" text-anchor="middle" letter-spacing="1">A C A D E M Y</text>
              </svg>
            </div>
          </div>

          <div style="text-align: center; margin-top: 20px; font-family: 'Pacifico', 'Berkshire Swash', cursive;">
            <h1 style="margin: 0; font-size: 32px; font-weight: normal; line-height: 1.2;">The Achiever's Academy</h1>
            <h2 style="margin: 0; font-size: 28px; font-weight: normal; margin-top: 5px;">2025-26</h2>
          </div>

          <div style="padding: 20px 30px; font-size: 15px; position: relative; z-index: 2; font-weight: 600;">
            <div style="margin-bottom: 10px;">Name of the student : <span style="font-weight: normal;">${studentName}</span></div>
            <div style="margin-bottom: 10px;">Std. <span style="margin-left: 28px;">: ${gradeDisplay}</span></div>
            <div style="margin-bottom: 10px;">Annual fees: <span style="font-weight: normal;">${amountStr}</span></div>
            <div style="margin-bottom: 20px;">M No. : <span style="font-weight: normal;">${mobile}</span></div>

            <table style="width: 100%; border-collapse: collapse; background-color: transparent; border: 1px solid #000;">
              <thead>
                <tr style="background-color: transparent;">
                  <th style="padding: 8px; border: 1px solid #000; text-align: center;"></th>
                  <th style="padding: 8px; border: 1px solid #000; text-align: center;">Amount</th>
                  <th style="padding: 8px; border: 1px solid #000; text-align: center;">Date</th>
                  <th style="padding: 8px; border: 1px solid #000; text-align: center;">Signature</th>
                </tr>
              </thead>
              <tbody>
                ${renderInstallmentRows()}
              </tbody>
            </table>
          </div>

          <div style="text-align: center; padding: 20px 0 30px 0; font-family: 'Pacifico', 'Berkshire Swash', cursive; font-size: 20px;">
            No Refund
          </div>

        </div>
      </div>
    `
    document.body.appendChild(hiddenDiv)
    generatePDF(`receipt-${payId}`, `Receipt_${payId}`).then(() => {
      document.body.removeChild(hiddenDiv)
    })
  }

  return (
    <div className="card">
      <div className="card-header" style={{ display: 'flex', gap: '1rem' }}>
        <button 
          className={`btn ${activeTab === 'pending' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending Verifications
        </button>
        <button 
          className={`btn ${activeTab === 'history' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('history')}
        >
          Payment History
        </button>
      </div>

      <div className="table-container" style={{ marginTop: '1.5rem' }}>
        {activeTab === 'pending' ? (
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Student</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Screenshot</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                    <Loader className="text-primary" size={24} style={{ animation: 'spin 1s linear infinite' }} />
                  </td>
                </tr>
              ) : pendingPayments.map(p => (
                <tr key={p.id}>
                  <td>{p.id.slice(0, 8).toUpperCase()}</td>
                  <td>{p.student}</td>
                  <td>{p.date}</td>
                  <td style={{ fontWeight: 600 }}>{p.amount}</td>
                  <td>
                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }}><Eye size={16} /> View</button>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-success" style={{ padding: '0.25rem 0.5rem' }} title="Approve" onClick={() => handleUpdateStatus(p.id, 'verified')}><Check size={16} /></button>
                      <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem' }} title="Reject" onClick={() => handleUpdateStatus(p.id, 'rejected')}><X size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && pendingPayments.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '1rem', color: '#64748b' }}>No pending payments to verify.</td></tr>
              )}
            </tbody>
          </table>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Student</th>
                <th>Verified Date</th>
                <th>Status</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {verifiedPayments.map(p => (
                <tr key={p.id}>
                  <td>{p.id.slice(0, 8).toUpperCase()}</td>
                  <td>{p.student}</td>
                  <td>{p.date}</td>
                  <td><span className="badge badge-success">Verified</span></td>
                  <td>
                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={() => handleGenerateReceipt(p.id, p)}>
                      <FileText size={16} /> Download
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && verifiedPayments.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '1rem', color: '#64748b' }}>No verified payments found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
