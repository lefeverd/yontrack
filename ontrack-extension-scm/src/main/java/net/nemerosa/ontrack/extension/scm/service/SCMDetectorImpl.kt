package net.nemerosa.ontrack.extension.scm.service

import net.nemerosa.ontrack.extension.api.ExtensionManager
import net.nemerosa.ontrack.model.structure.Project
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component

@Component
class SCMDetectorImpl(
    private val extensionManager: ExtensionManager,
) : SCMDetector {

    private val logger = LoggerFactory.getLogger(SCMDetectorImpl::class.java)

    private val extensions: Collection<SCMExtension> by lazy {
        extensionManager.getExtensions(SCMExtension::class.java)
    }

    /**
     * A SCM configuration which cannot be read, like a project property pointing to a configuration
     * stored by an older version, is considered as not set: the project has then no SCM, instead of
     * failing everything which looks for it (branch display names, change logs, ...). The property
     * itself is displayed with its error on the project, to be fixed there.
     */
    override fun getSCM(project: Project): SCM? =
        extensions.firstNotNullOfOrNull {
            try {
                it.getSCM(project)
            } catch (any: Exception) {
                logger.warn("Cannot read the SCM configuration of project ${project.name} for ${it::class.java.simpleName}, ignoring it: ${any.message}")
                null
            }
        }

}
