export default {
	transform: {
		'^.+\\.js$': 'babel-jest',
	},
	testEnvironment: 'node',
	setupFiles: ['./test/scripts/setUpBefore.js'],
	setupFilesAfterEnv: ['./test/scripts/setUp.js'],
	// ... other configurations
};
