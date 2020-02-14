const { onCreatePage } = require('../gatsby-node');

describe('gatsby-plugin-force-trailing-slashes', () => {
  const setup = ({ options = {}, ...rest }) => {
    const actions = {
      createPage: jest.fn(),
      deletePage: jest.fn(),
    };

    onCreatePage({ actions, ...rest }, options);

    return { actions };
  };

  it('handles index page correctly', () => {
    const { actions } = setup({ page: { path: '/' } });

    expect(actions.createPage).not.toBeCalled();
    expect(actions.deletePage).not.toBeCalled();
  });

  it('adds trailing slash', () => {
    const { actions } = setup({ page: { path: '/test' } });

    expect(actions.deletePage).toBeCalledWith({ path: '/test' });
    expect(actions.createPage).toBeCalledWith({ path: '/test/' });
  });

  it('uses default options', () => {
    const { actions } = setup({ page: { path: '/404.html' } });

    expect(actions.createPage).not.toBeCalled();
    expect(actions.deletePage).not.toBeCalled();
  });

  it('uses plugin options', () => {
    const { actions } = setup({
      page: { path: '/no-slash' },
      options: { excludedPaths: ['/no-slash'] },
    });

    expect(actions.createPage).not.toBeCalled();
    expect(actions.deletePage).not.toBeCalled();
  });
});
