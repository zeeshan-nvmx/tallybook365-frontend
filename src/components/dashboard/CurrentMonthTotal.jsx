import React, { useEffect } from 'react';
import { configuration } from '../../configurations/configurations';
import useAxios from '../../hooks/useAxios';
import { instance } from '../../utilities/axiosInstance';
import Styles from './CurrentMonthTotal.module.scss';
import { getAmountsWithCommas } from '../../utilities/utils';
import Loading from '../error/Loading';
export default function CurrentMonthTotal() {
	const [response, error, loading, axiosFetch, message] = useAxios();
	const getSelfInfo = () => {
		axiosFetch({
			axiosInstance: instance,
			method: 'Get',
			url: configuration.currentMonthTotal,
		});
	};

	useEffect(() => {
		getSelfInfo();
	}, []);

	const tableRow = response?.data?.lastSixMonthsDues?.map(
		(singleMonthsData, i) => (
			<tr key={i}>
				<td>{i + 1}</td>
				<td>{singleMonthsData?.month}</td>
				<td
					style={
						singleMonthsData?.totalInvoicedAmount >=
						singleMonthsData?.totalQuotedAmount
							? { color: 'black' }
							: { color: 'red' }
					}
				>
					{getAmountsWithCommas(singleMonthsData?.totalQuotedAmount)}
				</td>
				<td
					style={
						singleMonthsData?.totalInvoicedAmount >=
						singleMonthsData?.totalQuotedAmount
							? { color: 'black' }
							: { color: 'red' }
					}
				>
					{getAmountsWithCommas(singleMonthsData?.totalInvoicedAmount)}
				</td>
			</tr>
		)
	);

	return (
		<div className={Styles.main}>
			<div className={Styles.topSection}>
				<div className={Styles.left}>
					{loading && <Loading/>}
					{response?.data && !loading && !error && (
						<>
							<p>
								{
									response?.data?.runningMonthQuoteTotal
										?.currentMonth
								}
							</p>
							<small>Total quoted amount</small>
							<h2
								style={
									response?.data?.runningMonthInvoiceTotal
										?.totalInvoicedAmount >=
									response?.data?.runningMonthQuoteTotal
										?.totalQuotedAmount
										? { color: 'black' }
										: { color: 'red' }
								}
							>
								{
									getAmountsWithCommas(response?.data?.runningMonthQuoteTotal?.totalQuotedAmount)
								}
							</h2>
						</>
					)}
				</div>
				<div className={Styles.right}>
					{loading && <Loading/>}
					{response?.data && !loading && !error && (
						<>
							<p>
								{
									response?.data?.runningMonthInvoiceTotal
										?.currentMonth
								}
							</p>
							<small>Total invoiced amount</small>
							<h2
								style={
									response?.data?.runningMonthInvoiceTotal
										?.totalInvoicedAmount >=
									response?.data?.runningMonthQuoteTotal
										?.totalQuotedAmount
										? { color: 'black' }
										: { color: 'red' }
								}
							>
								{
									getAmountsWithCommas(response?.data?.runningMonthInvoiceTotal?.totalInvoicedAmount)
								}
							</h2>
						</>
					)}
				</div>
			</div>
			<br />
			<h3>Last Six Months Dues:</h3>
			<br />
			<div className={Styles.bottomSection}>
				{loading && <Loading/>}
				{response?.data && !loading && !error && (
					<div className={Styles.tableContainer}>
						<table>
							<tbody>
								<tr>
									<th>Ser</th>
									<th>Month</th>
									<th>Total Quoted Amount</th>
									<th>Total Invoiced Amount</th>
								</tr>
								{tableRow}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}
