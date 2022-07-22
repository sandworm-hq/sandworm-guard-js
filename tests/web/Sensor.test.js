const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('Sensor', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
  });

  test('AbsoluteOrientationSensor', async ({page}) => {
    if (!(await hasGlobalFeature('AbsoluteOrientationSensor', page))) {
      test.skip('AbsoluteOrientationSensor not available');
    }
    const activated = await page.evaluate(async () => new AbsoluteOrientationSensor().activated);
    expect(activated).toBeFalsy();
    await expectWebCallToMatch({
      family: 'Sensor',
      method: 'AbsoluteOrientationSensor',
      page,
    });
  });

  test('Accelerometer', async ({page}) => {
    if (!(await hasGlobalFeature('Accelerometer', page))) {
      test.skip('Accelerometer not available');
    }
    const activated = await page.evaluate(async () => new Accelerometer().activated);
    expect(activated).toBeFalsy();
    await expectWebCallToMatch({
      family: 'Sensor',
      method: 'Accelerometer',
      page,
    });
  });

  test('AmbientLightSensor', async ({page}) => {
    if (!(await hasGlobalFeature('AmbientLightSensor', page))) {
      test.skip('AmbientLightSensor not available');
    }
    const activated = await page.evaluate(async () => new AmbientLightSensor().activated);
    expect(activated).toBeFalsy();
    await expectWebCallToMatch({
      family: 'Sensor',
      method: 'AmbientLightSensor',
      page,
    });
  });

  test('GravitySensor', async ({page}) => {
    if (!(await hasGlobalFeature('GravitySensor', page))) {
      test.skip('GravitySensor not available');
    }
    const activated = await page.evaluate(async () => new GravitySensor().activated);
    expect(activated).toBeFalsy();
    await expectWebCallToMatch({
      family: 'Sensor',
      method: 'GravitySensor',
      page,
    });
  });

  test('Gyroscope', async ({page}) => {
    if (!(await hasGlobalFeature('Gyroscope', page))) {
      test.skip('Gyroscope not available');
    }
    const activated = await page.evaluate(async () => new Gyroscope().activated);
    expect(activated).toBeFalsy();
    await expectWebCallToMatch({
      family: 'Sensor',
      method: 'Gyroscope',
      page,
    });
  });

  test('LinearAccelerationSensor', async ({page}) => {
    if (!(await hasGlobalFeature('LinearAccelerationSensor', page))) {
      test.skip('LinearAccelerationSensor not available');
    }
    const activated = await page.evaluate(async () => new LinearAccelerationSensor().activated);
    expect(activated).toBeFalsy();
    await expectWebCallToMatch({
      family: 'Sensor',
      method: 'LinearAccelerationSensor',
      page,
    });
  });

  test('Magnetometer', async ({page}) => {
    if (!(await hasGlobalFeature('Magnetometer', page))) {
      test.skip('Magnetometer not available');
    }
    const activated = await page.evaluate(async () => new Magnetometer().activated);
    expect(activated).toBeFalsy();
    await expectWebCallToMatch({
      family: 'Sensor',
      method: 'Magnetometer',
      page,
    });
  });

  test('RelativeOrientationSensor', async ({page}) => {
    if (!(await hasGlobalFeature('RelativeOrientationSensor', page))) {
      test.skip('RelativeOrientationSensor not available');
    }
    const activated = await page.evaluate(async () => new RelativeOrientationSensor().activated);
    expect(activated).toBeFalsy();
    await expectWebCallToMatch({
      family: 'Sensor',
      method: 'RelativeOrientationSensor',
      page,
    });
  });
});
