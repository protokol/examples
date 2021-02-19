import "jest-extended";

import * as Data from "../src";

describe("Test Protokol Sets", () => {
	it("should loop thru data and verify correctly", () => {
		expect(Data).not.toBeUndefined();

		for (const set of Object.keys(Data)) {
			const dataSet = Data[set];
			expect(dataSet.collection).not.toBeUndefined();

			for (const asset of Object.keys(dataSet.assets)){
				expect(dataSet.assets[asset]).not.toBeUndefined();
			}
		}
	});
});
