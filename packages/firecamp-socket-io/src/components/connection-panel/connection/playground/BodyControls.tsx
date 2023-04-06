import {
  Container,
  Button,
  Input,
  ConfirmationPopover,
  Popover,
  EPopoverPosition,
  StatusBar,
  TabHeader,
} from '@firecamp/ui';
import { EditorCommands } from '../../../../constants';

const BodyControls = ({
  tabId = '',
  path = '',
  showClearPlaygroundButton = true,
  addNewEmitter = () => {},
}) => {
  return (
    <Container.Header>
      <StatusBar className="bg-statusBarBackground2 px-1 leading-5">
        <StatusBar.PrimaryRegion>
          <div data-tip={path} className="collection-path">
            {path || `./`}
          </div>
        </StatusBar.PrimaryRegion>
        <StatusBar.SecondaryRegion>
          {showClearPlaygroundButton === true ? (
            <ConfirmationPopover
              id={tabId}
              handler={
                <Button
                  id={`confirm-popover-handler-${tabId}`}
                  key="new_msg_button"
                  text={'+ New Emitter'}
                  transparent
                  ghost
                  sm
                />
              }
              title="Are you sure to reset playground and add new emitter?"
              _meta={{
                showDeleteIcon: false,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
              }}
              onConfirm={addNewEmitter}
            />
          ) : (
            <></>
          )}

          <Button
            id={`btn-${tabId}`}
            key="save_button"
            text={'Save'}
            secondary
            xs
          />
          <Button
            id={`btn-${tabId}`}
            key="save_button"
            text={'Save'}
            transparent
            ghost
            xs
          />
          <Button text="Send" onClick={() => {}} primary xs />

          {/* <ShortcutsInfo tabId={tabId} /> */}
        </StatusBar.SecondaryRegion>
      </StatusBar>
      <TabHeader className="padding-small height-small collection-path-wrapper">
        <TabHeader.Left></TabHeader.Left>
        <TabHeader.Right></TabHeader.Right>
      </TabHeader>
    </Container.Header>
  );
};
export default BodyControls;

const ShortcutsInfo = ({ tabId }) => {
  const _renderKeyboardShortcutInfo = () => {
    // console.log(`showClearPlaygroundButton`,showClearPlaygroundButton)
    try {
      let OSName = '';
      if (navigator.appVersion.indexOf('Win') != -1) OSName = 'Windows';
      if (navigator.appVersion.indexOf('Mac') != -1) OSName = 'MacOS';
      if (navigator.appVersion.indexOf('X11') != -1) OSName = 'UNIX';
      if (navigator.appVersion.indexOf('Linux') != -1) OSName = 'Linux';

      switch (OSName) {
        case 'Windows':
        case 'UNIX':
        case 'Linux':
          return (
            <div className="pb-2">
              {Object.values(EditorCommands).map((val, i) => {
                {
                  return (
                    <div className="flex" key={i}>
                      <div className="flex-1 pr-4 pl-2">{`${
                        val.name || ''
                      }`}</div>
                      <div className="ml-auto pr-2">{`${
                        val.view ? val.view['win'] : ''
                      }`}</div>
                    </div>
                  );
                }
              })}
            </div>
          );
          break;

        case 'MacOS':
          return (
            <div className="pb-2">
              {Object.values(EditorCommands).map((val, i) => {
                {
                  return (
                    <div className="flex" key={i}>
                      <div className="flex-1 pr-4 pl-2 font-semibold">{`${
                        val.name || ''
                      }`}</div>
                      <div className="pr-2 ml-auto">{`${
                        val.view ? val.view['mac'] : ''
                      }`}</div>
                    </div>
                  );
                }
              })}
            </div>
          );
          break;

        default:
          return '';
      }
      return 'Body';
    } catch (e) {
      return '';
    }
  };

  return (
    <Popover
      positions={[EPopoverPosition.Right]}
      content={
        <div className="w-48">
          <div className="text-sm font-bold mb-1 text-appForegroundActive opacity-70 px-2 pt-2 pb-2 border-b border-appBorder">
            Shortcuts
          </div>
          {_renderKeyboardShortcutInfo()}
        </div>
      }
    >
      <Popover.Handler id={`info-popover-${tabId}`}>
        info icon {/* TODO: add info icon here */}
      </Popover.Handler>
    </Popover>
  );
};
