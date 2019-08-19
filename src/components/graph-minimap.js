// @flow
/*
  Copyright(c) 2018 Uber Technologies, Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

          http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/*
  Zoom slider and zoom to fit controls for GraphView
*/
import * as d3 from 'd3';
import React from 'react';

class GraphMinimap extends React.Component {
  graphMinimapSvg

  constructor(props) {
    super(props);
    this.graphMinimapSvg = React.createRef();
  }

  renderMinimap() {
    let data = this.props.entities.cloneNode(true)
    const viewBBox = this.props.entities.getBBox ? this.props.entities.getBBox() : null;
    const graphMinimapWrapper = this.graphMinimapSvg.current
    const height = this.props.viewWrapper.current.clientHeight
    graphMinimapWrapper.setAttribute('viewBox', [viewBBox.x, viewBBox.y, viewBBox.width, viewBBox.height].join(' '))
    graphMinimapWrapper.setAttribute('height', height)
    data.childNodes.forEach(element => {
      element.id = "minimap_" + element.id
    });
    graphMinimapWrapper.prepend(data)

  }

  componentDidMount() {
    this.renderMinimap()
  }

  componentDidUpdate(prevProps) {
    const graphMinimapWrapper = this.graphMinimapSvg.current
    const graphMinimapWrapperEntities = graphMinimapWrapper.querySelector('.entities')
    graphMinimapWrapperEntities.remove()
    this.renderMinimap()
  }

  render() {
    const width_minimap = 150

    return (
        <div id="minimap">
            <svg ref={this.graphMinimapSvg} width={ width_minimap }>
            </svg>
        </div>
    );
  }
}

export default GraphMinimap;
