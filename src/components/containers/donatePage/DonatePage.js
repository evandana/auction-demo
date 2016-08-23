import React from 'react'

import './_donatePage.scss'

const DonatePage = ( {prop} ) => {

    return (
        <div className="donate-page">
            <h3>100% of every dollar helps cure bad code</h3>
            <table>
                <tbody>
                    <tr>
                        <td>Cash (preferred)</td>
                        <td>No processing fees</td>
                    </tr>
                    <tr>
                        <td>Other method (preferred)</td>
                        <td><a href="http://google.com" target="_BLANK">Link</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DonatePage